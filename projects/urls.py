from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ContactMessageCreateView, GitHubRepoListView, ProjectViewSet

router = DefaultRouter()
router.register("projects", ProjectViewSet, basename="project")

urlpatterns = [
    path("github-repos/", GitHubRepoListView.as_view(), name="github-repos"),
    path("contact/", ContactMessageCreateView.as_view(), name="contact"),
    path("", include(router.urls)),
]