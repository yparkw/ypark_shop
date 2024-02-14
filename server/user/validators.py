from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

class CustomPasswordValidator:
    def validate(self, password, user=None):
        if not any(char.isdigit() for char in password):
            raise ValidationError(_('비밀번호에는 최소 한 개 이상의 숫자가 포함되어야 합니다.'))
        if not any(char.isalpha() for char in password):
            raise ValidationError(_('비밀번호에는 최소 한 개 이상의 문자가 포함되어야 합니다.'))
        if not any(char.islower() for char in password):
            raise ValidationError(_('비밀번호에는 최소 한 개 이상의 소문자가 포함되어야 합니다.'))
        if not any(char.isupper() for char in password):
            raise ValidationError(_('비밀번호에는 최소 한 개 이상의 대문자가 포함되어야 합니다.'))
        if not any(char in "!@#$%^&*()" for char in password):
            raise ValidationError(_('비밀번호에는 최소 한 개 이상의 특수 문자(!@#$%^&*())가 포함되어야 합니다.'))

    def get_help_text(self):
        return _(
            "비밀번호는 최소 한 개 이상의 숫자, 문자, 소문자, 대문자, 특수 문자(!@#$%^&*())를 포함해야 합니다."
        )