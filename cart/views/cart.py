from rest_framework.views import APIView
from rest_framework.response import Response
from cart.models.cart import Cart, CartItem
from cart.serializers.cart import CartSerializer, CartItemSerializer

class CartView(APIView):
    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    # 장바구니에 아이템 추가
    def post(self, request):
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cart=request.user.cart)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# 장바구니 아이템 삭제
class CartItemDeleteView(APIView):
    def delete(self, request, pk):
        item = CartItem.objects.get(pk=pk)
        item.delete()
        return Response(status=204)
