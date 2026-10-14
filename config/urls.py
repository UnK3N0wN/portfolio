from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse

def health(request):
    return HttpResponse("ok")

urlpatterns = [
    path("health/", health),
    path("admin/", admin.site.urls),
    path("api/", include("projects.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)