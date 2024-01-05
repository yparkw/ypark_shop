# from rest_framework.parsers import MultiPartParser
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework import status

# class ImageUploadView(APIView):
#     parser_classes = (MultiPartParser,)

#     def post(self, request, *args, **kwargs):
#         # 파일은 request.FILES 안에 있습니다.
#         file_serializer = ImageSerializer(data=request.data)

#         if file_serializer.is_valid():
#             file_serializer.save()
#             # 파일 저장 후 URL 또는 식별자를 반환합니다.
#             return Response(file_serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # Django serializers.py
# from rest_framework import serializers
# from .models import ImageModel

# class ImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ImageModel
#         fields = "__all__"

# # Django models.py
# from django.db import models

# class ImageModel(models.Model):
#     image = models.ImageField(upload_to='images/')
    # 이미지에 대한 추가 데이터 필드를 여기에 정의할 수 있습니다.