import requests
from django.conf import settings
from django.core.cache import cache

GITHUB_API_URL = "https://api.github.com"
FRESH_TTL = 60 * 30        # refresh from GitHub every 30 minutes
STALE_TTL = 60 * 60 * 24   # keep a backup copy for 24 hours


class GitHubServiceError(Exception):
    """Raised when GitHub fails and there is no backup copy to show."""


def _request_repos(username, token):
    headers = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"

    last_error = None
    for _ in range(2):  # one retry for timeouts and short outages
        try:
            response = requests.get(
                f"{GITHUB_API_URL}/users/{username}/repos",
                headers=headers,
                params={"sort": "updated", "per_page": 100, "type": "owner"},
                timeout=10,
            )
            response.raise_for_status()
            return response.json()
        except requests.RequestException as exc:
            last_error = exc
    raise last_error


def fetch_github_repos(username=None, include_forks=False):
    username = username or settings.GITHUB_USERNAME
    key = f"github_repos:{username}:{include_forks}"
    stale_key = f"{key}:stale"

    cached = cache.get(key)
    if cached is not None:
        return cached

    try:
        raw = _request_repos(username, getattr(settings, "GITHUB_TOKEN", None))
    except requests.RequestException as exc:
        stale = cache.get(stale_key)
        if stale is not None:
            return stale  # show the last good list instead of an error
        raise GitHubServiceError(f"Failed to fetch GitHub repositories: {exc}") from exc

    repos = [
        {
            "id": repo["id"],
            "name": repo["name"],
            "description": repo["description"],
            "html_url": repo["html_url"],
            "homepage": repo["homepage"],
            "language": repo["language"],
            "stargazers_count": repo["stargazers_count"],
            "forks_count": repo["forks_count"],
            "topics": repo.get("topics", []),
            "updated_at": repo["updated_at"],
        }
        for repo in raw
        if include_forks or not repo["fork"]
    ]

    cache.set(key, repos, FRESH_TTL)
    cache.set(stale_key, repos, STALE_TTL)
    return repos