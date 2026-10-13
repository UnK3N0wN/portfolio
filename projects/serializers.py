from rest_framework import serializers

from .models import Project, ContactMessage, ProjectImage

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ["id", "image", "title", "description", "order"]


class ProjectSerializer(serializers.ModelSerializer):
    tech_list = serializers.SerializerMethodField()
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "image",
            "live_demo_link",
            "github_link",
            "is_featured",
            "tech_stack",
            "tech_list",
            "problem",
            "approach",
            "created_at",
            "images",
        ]

    def get_tech_list(self, obj):
        return [t.strip() for t in obj.tech_stack.split(",") if t.strip()]

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "message"]