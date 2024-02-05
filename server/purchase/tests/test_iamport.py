from django.test import TestCase
from unittest.mock import patch
from purchase.iamport import get_token, payment_prepare, find_transaction  # 가정: 이 함수들이 views.py에 정의되어 있음

class PaymentTests(TestCase):

    @patch('requests.post')
    def test_get_token_success(self, mock_post):
        # 아임포트에서 성공적으로 토큰을 받았다고 가정할 때의 응답
        mock_response = {
            'code': 0,
            'message': 'success',
            'response': {
                'access_token': 'test_token',
            }
        }
        mock_post.return_value.json.return_value = mock_response

        token = get_token()
        self.assertEqual(token, 'test_token')

    @patch('requests.post')
    def test_payment_prepare_success(self, mock_post):
        # 결제 준비 단계에서 성공적인 응답을 가정
        mock_post.return_value.json.return_value = {'code': 0}

        with patch('purchase.iamport.get_token', return_value='test_token'):
            # 결제 준비 함수 실행
            try:
                payment_prepare('order_id_123', 10000)
            except ValueError:
                self.fail('payment_prepare() raised ValueError unexpectedly!')

    @patch('requests.post')
    def test_find_transaction_success(self, mock_post):
        # 결제 완료 단계에서 성공적인 응답을 가정
        mock_response = {
            'code': 0,
            'response': {
                'imp_uid': 'imp_123',
                'merchant_uid': 'order_id_123',
                'amount': 10000,
                'status': 'paid',
                'pay_method': 'card',
                'receipt_url': 'http://receipt.url',
            }
        }
        mock_post.return_value.json.return_value = mock_response

        with patch('purchase.iamport.get_token', return_value='test_token'):
            result = find_transaction('order_id_123')
            self.assertIsNotNone(result)
            self.assertEqual(result['imp_id'], 'imp_123')