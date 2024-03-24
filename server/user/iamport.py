import requests
from django.conf import settings

# 아임포트와 통신하기 위한 토큰을 받아오는 함수
def get_token():
    print("iamport get token")
    access_data = {
        'imp_key': settings.IAMPORT_KEY,
        'imp_secret': settings.IAMPORT_SECRET,
    }

    url = "https://api.iamport.kr/users/getToken"

    req = requests.post(url, data=access_data)
    access_res = req.json() # requests에서 제공하는 json 내장함수

    # 토큰을 정상적으로 받은 경우
    if access_res['code'] == 0:
        print("token ok")
        return access_res['response']['access_token']
    else: # 토큰 수령 실패
        print("token failed")
        return None
