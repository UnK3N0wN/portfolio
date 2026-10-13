from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.throttling import ScopedRateThrottle

from .models import Project
from .serializers import ProjectSerializer, ContactMessageSerializer
from .services import fetch_github_repos, GitHubServiceError

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Get /api/projects/ - list of all projects
    Get /api/projects/<id>/ - detail of a specific project
    Get /api/projects/featured/?featured=true - featured only
    """
    serializer_class = ProjectSerializer
    def get_queryset(self):
        queryset = Project.objects.prefetch_related("images")
        if self.request.query_params.get("featured", "").lower() == "true":
            queryset = queryset.filter(is_featured=True)
        return queryset

class GitHubRepoListView(APIView):
    def get(self, request):
        username = request.query_params.get("username")
        include_forks = request.query_params.get("forks", "").lower() == "true"
        try:
            repos = fetch_github_repos(username=username, include_forks=include_forks)
        except GitHubServiceError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_502_BAD_GATEWAY)
        return Response(repos)

class ContactMessageCreateView(APIView):
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "contact"

    def post(self, request):
        # Honeypot: real visitors never fill this hidden field, bots often do.
        if request.data.get("website"):
            return Response({"detail": "Message sent."}, status=status.HTTP_201_CREATED)

        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "Message sent."}, status=status.HTTP_201_CREATED)

