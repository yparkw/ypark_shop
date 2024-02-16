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


# 진행순서
## 순서대로 진행합시다 frontend/
1. 회원가입 O
2. 로그인 O
3. 상품 등록 O ,(등록 상품 변경 폼 있어야함)
4. 비밀번호 규칙 대소문자 + 특수문자 + 숫자 + 9자이상 클라이언트에 표시 Xs
5. 상품 리스트 O
6. 상품 상세 O
7. 장바구니 O (장바구니 삭제 및 추가, 그리고 선택하여 구매할 수 있또록 체크박스 필요)

8. 구매하기

9. 상품 관리(UD, 카테고리 별)

10. 직원관리

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
3. 출력되는 가격 원화로 변환 X
4. "오스하이" 처럼 만들기 X