import os

import cloudinary.uploader
from cloudinary.utils import cloudinary_url
from django.core.files.storage import Storage


class CloudinaryMediaStorage(Storage):
    """Stores uploaded media on Cloudinary, using only the official SDK."""

    def _save(self, name, content):
        content.seek(0)
        result = cloudinary.uploader.upload(
            content,
            folder=os.path.dirname(name),
            use_filename=True,
            unique_filename=True,
            resource_type="image",
        )
        return f"{result['public_id']}.{result['format']}"

    def exists(self, name):
        return False  # Cloudinary adds a unique suffix, so names never clash

    def url(self, name):
        return cloudinary_url(name, secure=True, quality="auto")[0]

    def delete(self, name):
        cloudinary.uploader.destroy(os.path.splitext(name)[0], resource_type="image")