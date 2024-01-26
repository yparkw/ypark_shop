# Generated by Django 3.2.10 on 2023-12-11 07:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('products', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('uuid', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False)),
                ('quantity', models.PositiveIntegerField()),
                ('tid', models.CharField(blank=True, default=None, max_length=20, null=True)),
                ('ready', models.DateTimeField(blank=True, default=None, null=True)),
                ('approve', models.DateTimeField(blank=True, default=None, null=True)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.product')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='PurchaseApprovalResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('aid', models.CharField(max_length=50, verbose_name='요청 고유 변호')),
                ('payment_type', models.CharField(db_index=True, max_length=5, verbose_name='결제 수단')),
                ('total_amount', models.IntegerField(verbose_name='결제총액')),
                ('tax_free_amount', models.IntegerField(verbose_name='상품 비과세 금액')),
                ('vat_amount', models.IntegerField(default=0, verbose_name='상품 부가세 금액')),
                ('card_info', models.TextField(blank=True, null=True)),
                ('item_name', models.CharField(max_length=100)),
                ('ready_at', models.DateTimeField()),
                ('approved_at', models.DateTimeField()),
                ('purchase', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='purchase.purchase', verbose_name='주문번호')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]