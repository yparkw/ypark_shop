from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from rest_framework import status
from products.models.product import Product, Size, ProductSize
from django.core.files.uploadedfile import SimpleUploadedFile
import json


class ProductAPITestCase(APITestCase):

    def setUp(self):
        # 클라이언트 설정
        self.client = APIClient()
        
        # data = {
        #         'email':'ehgus8621@gmail.com', 
        #         'password':'!Ll1185216'
        # }
        
        # print(json.dumps(data))
        # response = self.client.post(
        #     reverse('api:user:token_obtain_pair'),
        #     data = json.dumps(data), 
        #     content_type="application/json"
        # )
        # self.token = response.data['access']
        # self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        # # 사이즈 인스턴스 생성
        size_s = Size.objects.create(size='S')
        
        # 상품 인스턴스 생성 및 사이즈 연결
        product = Product.objects.create(
            name="테스트 상품",
            price=10000,
            category='상의',
        )
        ProductSize.objects.create(product=product, size=size_s, count=5)
        
        # 이미지 파일 모의 생성
        self.image = SimpleUploadedFile("file.jpg", b"file_content", content_type="image/jpeg")

    def test_get_products(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # 페이지네이션으로 인한 응답 형식에 따라 다를 수 있음

    # def test_create_product(self):
    #     data = {
    #         "created_at": "2024-01-14T16:07:40.234380+09:00",
    #         "modified_at": "2024-01-14T16:07:40.234380+09:00",
    #         "name": "새 상품",
    #         "price": "20000.00",
    #         "category": "상의",
    #         "sizes": [{"size": "S", "count": 3}],
    #         "image": self.image,
    #     }
    #     # 파일 업로드 요청
    #     upload_response = self.client.post('/api/upload/', data)
    #     print("Status Code:", upload_response.status_code)  # HTTP 상태 코드 출력
    #     print("Response Content:", upload_response.content)  # 응답 내용 출력

    #     data = {
    #         "created_at": "2024-01-14T16:07:40.234380+09:00",
    #         "modified_at": "2024-01-14T16:07:40.234380+09:00",
    #         "name": "새 상품",
    #         "price": "20000.00",
    #         "category": "상의",
    #         "sizes": [{"size": "S", "count": 3}],
    #         "image_url": upload_response,
    #     }
        
    #     response = self.client.post('/api/products/', data)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #     self.assertEqual(Product.objects.count(), 2)
    #     self.assertEqual(ProductSize.objects.count(), 2)