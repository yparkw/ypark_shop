import decimal
import typing

import strawberry

from .. import models


# GraphQL 타입으로 정의
@strawberry.django.type(models.Product)
class Product:
    id: int
    title: str
    price: decimal.Decimal
    image: str


@strawberry.type
class Query:
    products: typing.List[Product] = strawberry.django.field()