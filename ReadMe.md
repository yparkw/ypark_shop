## Commit rule
      1. 제목과 본문을 빈 행으로 구분한다
      2. 제목을 50글자 내로 제한
      3. 제목 첫 글자는 대문자로 작성
      4. 제목 끝에 마침표 넣지 않기
      5. 제목은 명령문으로 사용하며 과거형을 사용하지 않는다
      6. 본문의 각 행은 72글자 내로 제한
      7. 어떻게 보다는 무엇과 왜를 설명한다

## Commit type
- feat : 새로운 기능에 대한 커밋
- fix : 버그 수정에 대한 커밋
- build : 빌드 관련 파일 수정에 대한 커밋
- chore : 그 외 자잘한 수정에 대한 커밋
- ci : CI관련 설정 수정에 대한 커밋
- docs : 문서 수정에 대한 커밋
- style : 코드 스타일 혹은 포맷 등에 관한 커밋
- refactor :  코드 리팩토링에 대한 커밋
- test : 테스트 코드 수정에 대한 커밋


## Must
0. docker compose 빌드 시간 줄이기 (해결)
      issue: 메모리 문제였음
1. certbot을 활용하여 HTTPS 강화하기(해결)
      issue: docker-compose.yml: 볼륨 마운트 문제 + 인증서 발급 최적화 문제
2. Docker-compose를 활용하여 로컬에서 PostgreSQL 사용하기(해결)
      - docker-compose.yml 과 nginx.conf 개발환경 배포환경 분리하기
      - 초기 잘못 생성한 db의 이름이 postgres였다 이게 문제였음
      
3. github actions를 활용한 테스트 자동화 및 배포 자동화
4. 이미지 스토리지 분리하기
5. 테스트 코드 작성을 통한 유닛 테스트
6. postman을 활용한 결제 테스트 vs vs확장팩 활용
7. Seleninum을 통한 통합테스트
8. 구매시 db 성능저하 개선

## alpha
1. 환불 로직 구현하기
2. Celery를 활용하여 구매확정 스케줄링하기








