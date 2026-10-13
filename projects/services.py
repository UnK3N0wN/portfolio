import requests
from django.conf import settings
from django.core.cache import cache

GITHUB_API_URL = "https://api.github.com"
CACHE_TTL = 60 * 10 

class GitHubServiceError(Exception):
    """Raised when error in Github Api request fails."""

def fetch_github_repos(username=None, include_forks=False):
    username = username or settings.GITHUB_USERNAME
    cache_key = f"github_repos:{username}:{include_forks}"

    cached = cache.get(cache_key)
    if cached is not None:
        return cached

    headers = {
        "Accept": "application/vnd.github+json",
        "X-Github-Api-Version": "2022-11-28",
    }
    token = getattr(settings, "GITHUB_TOKEN", None)
    if token:
        headers["Authorization"] = f"Bearer {token}"

    try:
        response = requests.get(
            f"{GITHUB_API_URL}/users/{username}/repos",
            headers=headers,
            params={"sort":"updated", "per_page": 100, "type": "owner"}, timeout=10,
        )
        response.raise_for_status()
    except requests.RequestException as exc:
        raise GitHubServiceError(f"Failed to fetch Github repositories: {exc}") from exc

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
        for repo in response.json()
        if include_forks or not repo["fork"]
    ]

    cache.set(cache_key, repos, CACHE_TTL)
    return repos