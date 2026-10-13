from django.db import models

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    live_demo_link = models.URLField(blank=True)
    github_link = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    tech_stack = models.CharField(
        max_length=300,
        blank=True,
        help_text="Comma-separated, e.g. Django, React, PostgreSQL",
    )
    problem = models.TextField(blank=True)
    approach = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-is_featured", "-created_at"]

    def __str__(self):
        return self.title

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="projects/gallery/")
    title = models.CharField(max_length=120, blank=True, help_text="e.g. Login page")
    description = models.TextField(blank=True, help_text="What this part does and how you built it")
    order = models.PositiveIntegerField(default=0, help_text="1 shows first")

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.project.title}: {self.title or self.order}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField(max_length=2000)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.email})"
