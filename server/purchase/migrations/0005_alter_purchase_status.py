# Generated by Django 4.2.9 on 2024-03-04 05:35

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("purchase", "0004_purchase_buyer_detailaddress"),
    ]

    operations = [
        migrations.AlterField(
            model_name="purchase",
            name="status",
            field=models.CharField(
                choices=[("ordered", "주문"), ("shipping", "배송중"), ("cofirmed", "구매확정")],
                default="ordered",
                max_length=20,
            ),
        ),
    ]
