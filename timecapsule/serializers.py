# from rest_framework import serializers
# from .models import TimeCapsule

# class TimeCapsuleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TimeCapsule
#         fields = ['id', 'content_type', 'text_content', 'file_url', 'scheduled_date']
#         extra_kwargs = {
#             'file_url': {'required': False},
#             'text_content': {'required': False}
#         }

#     def validate(self, data):
#         content_type = data.get('content_type')
        
#         if content_type == 'text' and not data.get('text_content'):
#             raise serializers.ValidationError("Text content is required for text type")
            
#         if content_type in ['image', 'voice'] and not data.get('file_url'):
#             raise serializers.ValidationError("File upload is required for image/voice type")
            
#         return data


# from rest_framework import serializers
# from .models import TimeCapsule

# class TimeCapsuleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TimeCapsule
#         fields = ['id', 'content_type', 'text_content', 'file', 'scheduled_date', 'is_opened']
#         extra_kwargs = {
#             'file': {
#                 'required': False,
#                 'allow_empty_file': False,
#             },
#             'text_content': {'required': False}
#         }

#     def validate(self, data):
#         content_type = data.get('content_type')
#         has_file = 'file' in self.context['request'].FILES
#         text_content = data.get('text_content')
#         content_type = data.get('content_type')
#         has_file = 'file' in self.context['request'].FILES
#         text_content = data.get('text_content')

#         if content_type == 'text':
#             if not text_content:
#                 raise serializers.ValidationError("Text content is required for text type")
#             if has_file:
#                 raise serializers.ValidationError("Cannot upload file with text content type")
#         else:
#             if not has_file:
#                 raise serializers.ValidationError("File is required for this content type")
#             if text_content:
#                 raise serializers.ValidationError("Cannot provide text content with file upload")

#         return data


from rest_framework import serializers
from django.core.validators import FileExtensionValidator
from .models import TimeCapsule


class TimeCapsuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeCapsule
        fields = ['id', 'content_type', 'text_content', 'file', 'scheduled_date', 'is_opened']
        # Remove 'user' from fields and add extra_kwargs
        extra_kwargs = {
            'user': {'read_only': True},  # 👈 Automatically set, not required in input
            'file': {'required': False},
            'text_content': {'required': False}
        }

    def validate(self, data):
        content_type = data.get('content_type')
        has_file = 'file' in self.context['request'].FILES
        text_content = data.get('text_content')

        # Text validation
        if content_type == 'text':
            if not text_content:
                raise serializers.ValidationError("Text content is required for text type")
            if has_file:
                raise serializers.ValidationError("Cannot upload file with text content type")

        # File validation
        elif content_type == 'file':
            if not has_file:
                raise serializers.ValidationError("File is required for this content type")
            if text_content:
                raise serializers.ValidationError("Cannot provide text content with file upload")

        return data