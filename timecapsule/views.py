# from rest_framework import status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from .models import TimeCapsule
# from .serializers import TimeCapsuleSerializer
# from timecapsule.firebase_storage import upload_to_firebase
# import uuid


# ALLOWED_FILE_TYPES = {
#     'image': ['image/jpeg', 'image/png', 'image/gif'],
#     'voice': ['audio/mpeg', 'audio/wav'],
#     'doc': ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
#     'pdf': ['application/pdf']
# }

# class TimeCapsuleCreateView(APIView):
#     permission_classes = [IsAuthenticated]
    
#     def post(self, request):
#         serializer = TimeCapsuleSerializer(data=request.data)
#         if serializer.is_valid():
#             data = serializer.validated_data
#             content_type = data['content_type']
            
#             # Handle file upload
#             file = None
#             if content_type in ['image', 'voice', 'doc', 'pdf']:
#             file = request.FILES.get('file')
            
#             # Validate file type
#             if file.content_type not in ALLOWED_FILE_TYPES[content_type]:
#                 return Response(
#                     {'error': f'Invalid file type for {content_type}. Allowed: {ALLOWED_FILE_TYPES[content_type]}'},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
            
#             # Upload to Firebase
#             file_url = upload_to_firebase(file, content_type)
            
#             return Response({
#                 'message': 'Time capsule created successfully',
#                 'id': capsule.id
#             }, status=status.HTTP_201_CREATED)
            
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import TimeCapsule
from .serializers import TimeCapsuleSerializer

# class TimeCapsuleCreateView(APIView):
#     permission_classes = [IsAuthenticated]
    
#     def post(self, request):
#         serializer = TimeCapsuleSerializer(
#             data=request.data,
#             context={'request': request}
#         )
        
#         if serializer.is_valid():
#             serializer.save(user=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
            
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# views.py
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import TimeCapsule
from .serializers import TimeCapsuleSerializer

class TimeCapsuleCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = TimeCapsuleSerializer(
            data=request.data,
            context={'request': request}
        )
        
        if serializer.is_valid():
            # 👇 Set the user to the authenticated user
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)