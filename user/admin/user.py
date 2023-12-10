from django.contrib import admin

from ..models.user import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('pk', 'email',)
    fields = ('pk', 'email', 'password',)
    readonly_fields = ('pk',)