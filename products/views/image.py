from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

@permission_classes([AllowAny, ]) # 디버깅용 AllowAny
class ImageUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        image_file = request.FILES.get('image')
        if not image_file:
            return Response({'detail': 'No image file provided.'}, status=status.HTTP_400_BAD_REQUEST)

        # 이미지 파일을 처리하는 로직 (예: 모델에 저장)
        # 예시로 단순히 파일 이름을 반환합니다. 실제 구현에서는 파일을 저장하고 URL 등을 반환해야 합니다.
        return Response({'filename': image_file.name}, status=status.HTTP_201_CREATED)