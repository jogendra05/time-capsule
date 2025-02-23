from django.db import models
from account.models import User

# class TimeCapsule(models.Model):
#     CONTENT_TYPES = (
#         ('text', 'Text'),
#         ('image', 'Image'),
#         ('voice', 'Voice'),
#     )
    
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     content_type = models.CharField(max_length=10, choices=CONTENT_TYPES)
#     text_content = models.TextField(blank=True, null=True)
#     file_url = models.URLField(blank=True, null=True)
#     scheduled_date = models.DateTimeField()
#     is_opened = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)

# models.py
# from django.db import models
# from storages.backends.b2 import B2Storage

# class TimeCapsule(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     content_type = models.CharField(max_length=10)
#     text_content = models.TextField(blank=True)
#     file = models.FileField(
#         upload_to='timecapsule_files/',  # Folder in B2 bucket
#         storage=B2Storage(),            # Use B2 storage
#         blank=True
#     )
#     scheduled_date = models.DateTimeField()

# models.py
# from django.db import models
# from account.models import User
# from cloudinary_storage.storage import MediaCloudinaryStorage  # Changed

# # models.py
# class TimeCapsule(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     content_type = models.CharField(max_length=10)
#     text_content = models.TextField(blank=True)
#     file = models.FileField(
#         upload_to='timecapsule_files/',
#         storage=MediaCloudinaryStorage(
#             resource_type='auto'  # 👈 Accepts videos/images
#         ),
#         blank=True,
#         null=True
#     )
#     scheduled_date = models.DateTimeField()
#     is_opened = models.BooleanField(default=False)  # Add this line


from django.db import models
from cloudinary_storage.storage import MediaCloudinaryStorage, RawMediaCloudinaryStorage
from account.models import User
import uuid

def custom_upload_path(instance, filename):
    sanitized_name = filename.replace(" ", "_").replace(".", "-")
    return f"timecapsule/{uuid.uuid4()}_{sanitized_name}"

class TimeCapsule(models.Model):
    CONTENT_TYPES = [
        ('text', 'Text'),
        ('file', 'File (Image/PDF/Video)'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content_type = models.CharField(max_length=10, choices=CONTENT_TYPES)
    text_content = models.TextField(blank=True)
    file = models.FileField(
        upload_to=custom_upload_path,
        storage=MediaCloudinaryStorage(
            resource_type='auto'  # Auto-detect file type (image, video, raw)
        ),
        blank=True,
        null=True
    )
    scheduled_date = models.DateTimeField()
    is_opened = models.BooleanField(default=False)