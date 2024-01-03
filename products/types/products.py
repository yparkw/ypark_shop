import decimal
import typing
import strawberry

from products.models.product import Product


# GraphQL 타입으로 정의
@strawberry.django.type(Product)
class Product:
    id: int
    title: str
    price: decimal.Decimal
    category: str
    size: str
    stock: int
    image: str


@strawberry.type
class Query:
    products: typing.List[Product] = strawberry.django.field()