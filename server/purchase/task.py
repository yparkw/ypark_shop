# from celery import shared_task
# from purchase.models.purchase import Purchase
# from django.utils import timezone
# from datetime import timedelta

# @shared_task
# def auto_confirm_purchase(purchase_id):
#     try:
#         purchase = Purchase.objects.get(id=purchase_id)
#         if purchase.status == 'shipping':
#             purchase.status = 'confirmed'  # '구매확정' 상태로 업데이트
#             purchase.save()
#             print(f"Purchase {purchase_id} confirmed automatically.")
#     except Purchase.DoesNotExist:
#         print(f"Purchase {purchase_id} not found.")
        
# from django_celery_beat.models import PeriodicTask, IntervalSchedule
# from datetime import datetime, timedelta

# # 배송중 상태로 변경하는 함수 내부에서 호출
# def schedule_auto_confirm(purchase_id):
#     schedule, _ = IntervalSchedule.objects.get_or_create(
#         every=14, period=IntervalSchedule.DAYS,
#     )
#     task_name = f"auto-confirm-purchase-{purchase_id}-{datetime.now()}"
#     PeriodicTask.objects.create(
#         interval=schedule,
#         name=task_name,
#         task='yourapp.tasks.auto_confirm_purchase',
#         args=json.dumps([purchase_id]),
#         one_off=True,  # 단발성 작업
#         start_time=datetime.now() + timedelta(days=14)
#     )