from django.contrib import admin
from django.utils.html import format_html

from .models import Project, ContactMessage, ProjectImage

class ProjectImageInline(admin.StackedInline):
    model = ProjectImage
    extra = 3
    fields = ("image", "title", "description", "order")

@admin.register(Project)   
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "is_featured", "created_at", "image_preview")
    list_filter = ("is_featured",)
    list_editable = ("is_featured",)
    search_fields = ("title", "description")
    readonly_fields = ("image_preview",)
    inlines = [ProjectImageInline]

    @admin.display(description="Preview")
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="height:60px;border-radius:4px;" />',
                obj.image.url,
            )
        return "-"

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "created_at", "is_read")
    list_filter = ("is_read",)
    list_editable = ("is_read",)
    search_fields = ("name", "email", "message")
    readonly_fields = ("name", "email", "message", "created_at")