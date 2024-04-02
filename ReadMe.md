# 나중에 정리해야할 것
1. "요소에 따른 배치 CSS 사용법"
2. "다량의 데이터를 불러올 떄 페이징 네이션 하는 이유?"
3. "토큰의 발급 되면 어디에 존재하는가?"
4. "토큰은 어떻게 관리되는 가?"
5. "access, resfresh 토큰의 차이와 access토큰을 확인하는 JWTAthentication"
6. "formData를 전송할 때 왜 파일과 json을 분리하여 전송해야 하는가?"
7. "상품등록을 위한 데이터 형식 분리와 비동기 처리"
8. "axios 버전문제로 인한 formData 인식실패"
9. "쿠키와 CORS 정책의 관계"
10. "SerializerMethodField()를 사용하여 두개의 테이블에서 데이터 파싱하기"
11. "Redux 상태관리시스템을 통한 상태 관리"
12. "foreignkey error 무결성에 문제가 없더라도 migrations 폴더와 pycache에 문제가 없는지 살펴보기"
13. "serializer 분리를 통한 get, post 요청 다르기 받기",
14. "구매사이클 테스트 하는법"
15. "react package.json package-lock.json 차이"
16. " DB 서버에 직접 설치하여 블록스토리지연동 vs DB 인스턴스 사용"
17. "결제테스트를 위한 단위테스트, 통합테스트(postman), E2E테스트(selenium)
18. 비밀번호 규칙 커스텀
19. "nginx root와 alias 차이"
20. "통합인증 X -> 통합결제 O 로의 변화"
21. "Q객체를 활용한 DB 조희에 조건 걸기"

----- 면접 때 사용할 이슈들 
양식
https://sbl1998.notion.site/83acc20d07f74f569ba26ee648a5f517?pvs=4
{
    링크, 간단소개, 한두줄 소개, 챌린징했던 작업들 
}

1. 배포환경/개발환경 변수 불일치
2. 구매시 업데이트된 자료 시간 최적화
3. Docker-compose, github actions를 활용한 테스트, 배포 자동화(TDD)

4. # 진행순서
## 순서대로 진행합시다 frontend/
1. 회원가입 O
2. 로그인 O
3. 상품 등록 O ,(등록 상품 변경 폼 있어야함)
4. 비밀번호 O
5. 상품 리스트 O
6. 상품 상세 O
7. 장바구니 O 
   
8.  나의 페이지
9) 내 정보 수정하기 O
10) 주문내역 보기
    - 구매 상품 정보 O
    - 구매수량 O
    - 결제액 O
    - 주문 상태(주문확인, 배송, 구매확정) O
    - 교환, 환불 X
11) 구매확정내역 X

12. SHOP 페이지
   - 카테고리별 정렬 O
   - 페이징네이션 O

13. 관리자페이지
14) 상품관리 O
15) 유저관리 O
16) 주문관리 X
    - 주문취소버튼
    - 배송시작 버튼
17) 배송중 표시 X
18) 구매후 변심(기간은 어떻게 할 것인가)
19) 구매확정 매출표시 어떻게 할것인가 X

20. 구매하기
    1) 결제테스트해야함
    2) 백엔드에 결제 데이터 전송되는지 테스트
    3) 클라이언트에서 데이터 전송 테스트
    4) 최종 테스트


10. 관리자페이지
    1) 상품 관리하기
    2) 유저 관리하기
    3) 주문 관리하기
    4) 배송중인 상품들
    5) 도착한 상품들
    6) 구매확정된 상품들


---- 우선적으로 끝낼 것
11. 포인트 추가하기
- 구매시 몇 프로 적립, 즉시 할인

12. 구매 시 
  13) 주문 데이터 전송
  14) 수량 확인
  15) 수량이 없을 경우 품절되었음을 알림
  16) 수량이 있을 경우 해당되는 수량을 차감

13. 환불시
 14) 구매시 등록된 구매정보를 체크
 15) 상품 확인
 16) 환불 확정
 17) 금액 돌려주기

14. 배송 시
 - 배송 상태를 확인
 - 배송이 도착함
 - 도착 후 14일 이후 구매확정 처리


-------------------------------
## 임시 배포중
1. 도커파일 생성 O
2. 도커 컴포즈 생성 O
3. 서버 도커 설치 및 소스코드 저장 O
4. 빌드 성공 O
5. 서버 포트 방화벽 설정 O
6. 도메인 연결 O
7. 서버 psotgresql 이미지 띄운 후 DB와 계정 생성 O
8. DB 연결 O

# 요구사항
1. 회원가입이 완료되면 완료창이떳으면함 O
2. 상세주소 가입할때 넣을수있게 했음함 O
3. 출력되는 가격 원화로 변환 O
4. "오스하이" 처럼 만들기 O