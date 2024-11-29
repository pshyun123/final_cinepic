# **CinePic** 
🔗 **CinePic 사이트**

https://cinepic2024.site </br>

🔗 **발표 PPT**

[파이널 프로젝트 피피티-Cine Pic.pptx](https://github.com/user-attachments/files/15971084/-Cine.Pic.pptx)


🔗 **CinePic 페이지**

[씨네픽 전체 이미지.pdf](https://github.com/user-attachments/files/15971146/default.pdf)

---

## 🔍 **프로젝트 소개** 
**Cinepic**은 회원가입 시 입력한 취향 정보 및 영화 북마크 데이터를 기반으로 **사용자 맞춤 영화 추천**을 제공하는 사이트입니다. 
 
### 📌 **씨네픽의 특징** 
1. **머신러닝 기반 영화 추천** 
2. **엘라스틱서치 적용한 영화 검색**
3. **독립영화 상영 극장 정보 제공** (지도 API 활용) 
4. **결제 기능**: 모든 카드사를 지원하는 결제 시스템 
5. **사용자 편의에 맞춘 UIUX 개선**: 사용자 편의에 맞춘 디자인 개선과 더불어 AWS 프리티어의 제한 사항을 고려하여 AWS 배포
6. **커뮤니티 게시판** (사용자 후기, 크루 모집), **실시간 채팅** (웹소켓 기반) 
7. **관리자 페이지**: 회원, 게시판, FAQ 관리를 위한 데이터 시각화 
---

###📌 프로젝트에 포함 될 주요 기능
- 주제 선정, 화면 구성(Figma)부터 프론트엔드, 백엔드, DataBase 설계, AWS 배포까지 전반적인 구현 경험
- CRUD 구현 및 다양한 API 활용
- React, Java, SpringBoot, MySQL, jwt, 웹소켓, Python, ElasticSearch, 머신러닝을 이용한 여러 기술 익히기
- 문서 작업(wbs 및 단위 테스트 진행)
   - WBS 방식의 일정 작성
   - 스토리 보드 작성
   - 기획 문서(일정, 팀원 역할, 설계 문서(ERD), 주제 선정)
- 필수 기능
   1. 머신러닝을 활용한 맞춤 영화 추천
   2. ElasticSearch를 활용 한 영화 검색
   3. 이메일 인증(아이디=이메일)
   4. 맞춤 추천을 위한 유저 취향 수집 (취향 설문 + 북마크 + 검색키워드)
   5. 게시판 활용(모임 모집 및 후기 공유(댓글 기능))
   6. 검색한 지역의 영화관 정보 제공
   7. 결제 ⇒ 멤버십 회원은 광고 제거
   8. 영화 상세 정보 제공 + (유저 평점, 간이 포스트 기능)
   9. 유저간 채팅기능
   10. 관리자 페이지 (시각화)
- 배포
   - AWS 클라우드 서비스 배포
   - 도메인 계정 등록(가비아)
---

### ⏰ 개발기간
2024.01.15 ~ 2024.02.16
| 분류 | 날짜 | 
| :--- | :--- |
| 1. 주제, 요구사항 | 1/15 ~ 1/17 |
| 2. 스토리보드 | 1/15 ~ 1/17 |
| 3. DATABASE | 1/17 ~ 17|
| 4. FRONTEND | 1/18 ~ 2/4 |
| 5. BACKEND | 1/18 ~ 2/4 |
| 6. AWS | 1/14 ~ 1/16 |

 
---


## 👨‍👩‍👧‍👦 역할분담 
| 팀원 | 역할 |
| --- | --- |
| 김현지(팀장) | 로그인,회원가입 페이지 / 영화 검색 (엘라스틱 서치) |
| 박소현 | 메인페이지(머신러닝) / 결제페이지 / 관리자페이지  |
| 김지은 | 영화상세 페이지 / 게시판 리스트 페이지 |
| 황선영 | 영화관 정보 / 취향 선택 페이지 |
| 유현주 | 마이페이지 / 404페이지 / 카카오 대기페이지 / 이메일인증(Backend)/ 관리자(FAQ) |
| 이세웅 | 게시글 상세페이지 + 댓글 / 게시글 작성 및 수정 페이지 |

| 구현 내용 | 상세 정보 |
| --- | --- |
| 메인화면 | 메인 사진영화추천(로그인 전) </br> 회원 취향관련 영화추천(로그인 후)</br>요일별 장르 추천</br>페이지 내 다른 기능페이지 이동</br>중간 배너(광고)
FAQ창 |
| 로그인 및 회원가입 | 회원 로그인 / 관리자 로그인카카오 로그인(제 3자 인증방식)</br>회원가입(이메일 인증,취향 등록)</br>비밀번호 찾기 |
| 엘라스틱서치(검색기능) | 영화 검색(최신순,관련순) |
|  머신러닝 | 영화상세내용 |
| 채팅기능 | 영화취향 공유 채팅방 |
| 결제기능 | 광고결제 |
| 취향수집 | 북마크 |
| 마이페이지 | 회원정보수정</br>내 취향 수정</br>내 글 관리하기 |
| 관리자페이지 | 회원 관리</br>게시판 관리</br>FAQ 관리 |
| 영화 검색 | 무한스크롤</br>과거순 정렬</br>영화 검색이나 키워드 검색 |
| 영화 상세 정보 | 후기 댓글</br>포토 후기</br>게시판</br>스틸 컷(모달)</br>씨네포스트 - 가로 슬라이드</br>최신순, 과거순 필터</br>검색기능 |
| 영화 상세 정보 제공 지도 api | 독립, 예술 영화관 찾기</br>시나 도 키워드 검색으로 상세내용 및 선택 키워드 마커표시 |
|  jwt 보안 | 보안설정 |
| Python 크롤링 | 영화정보 가져오기</br>지도 데이터 정보 받아오기 |
| 오류페이지 | 404페이지 |




## 👨‍👩‍👧‍👦 **나의 역할** 
### **1. 메인 페이지 (머신러닝)** 
- 사용자 취향 분석 결과를 기반으로 영화 추천 기능 구현 
- 직관적인 디자인을 통해 사용자 편의성 극대화 
![#0_메인페이지](https://github.com/user-attachments/assets/ea60e82c-b03a-4ce5-a8d0-8a9bb9e625c6)
![#1 씨네픽_메인 (1)](https://github.com/user-attachments/assets/9a7735e5-1d58-4a1f-ad28-79747dc1184d)
 
### **2. 결제 페이지** 
- 실제 사용자의 정보를 받아 DB에 변경된 멤버십 내용을 저장. DB 업데이트 
- 멤버십 회원 여부에 따라 광고 배너 제거 
 ![#2 35](https://github.com/user-attachments/assets/5bf44b47-874f-4499-816c-0a0f6b94b42c)
 
 
### **3. 관리자 페이지 - 회원관리** 
- **차트 라이브러리 활용**: 가입자 현황(월별, 타입별)을 차트로 시각화 
- **커스텀 훅 구현**: 로그인 상태 관리 및 자동 토큰 갱신(코드의 재사용성을 높이고, 애플리케이션의 안정성을 향상)
 ![#3씨네픽_관리자_회원](https://github.com/user-attachments/assets/55bb0b8f-5078-4a5f-bfd8-a6f1237cfd26)


### **4. 관리자 페이지 - 게시판 관리** 
- **React.memo()**: 대/소분류 변경 시에만 리렌더링 되도록 최적화 
- 게시판 데이터 통계를 Bar Chart로 시각화 
![#4 씨네픽_관리자_게시판](https://github.com/user-attachments/assets/ad081159-df78-46a7-915e-5b769999e74b)
 
---
 
## 📄 **문서 작업** 
프로젝트 진행에 있어, 협동성과 효율성을 높이기 위해 문서화 자료를 만들었습니다.아래는 프로젝트 동안 생성한 주요 문서의 일부입니다.
 
### 1. WBS (작업 분류 체계) 
 <img width="963" alt="#5  wbs" src="https://github.com/user-attachments/assets/a2ab5d10-86a3-4ef8-b05f-7b08c5e80752">
<img width="1117" alt="#6 wbs2" src="https://github.com/user-attachments/assets/4de9722d-ef7a-42ed-b2ab-591afb7b41ec">

### 2. 메뉴트리 / ERD 
![#7씨네픽_메뉴트리](https://github.com/user-attachments/assets/8244ad7f-a80c-4090-887a-b756892e0348)
![#8cinepic_erd](https://github.com/user-attachments/assets/9007eee1-35af-4979-bb32-df83fce01553)
 
### 3. 스토리보드 (Figma) 
![32_메인](https://github.com/user-attachments/assets/78762edd-55fc-4a6a-a7c9-a4fbec5074cd)
 
### 4. 단위 테스트 결과 
<img width="1440" alt="#9 단위테스트-프론트" src="https://github.com/user-attachments/assets/e645f908-29d7-41d0-8e62-1d145fba2468">
<img width="1199" alt="#10 단위-백" src="https://github.com/user-attachments/assets/4613efe2-2246-4f5a-982f-dfe795154728">

### 5. 애자일 - 스플린트 회의
약 일주일의 스플린트 단위를 투고 매일 짧은 회의를 통해 각자의 진행속도 및 문제 사항 점검
<img width="589" alt="#11  스플린트 2024-11-29 오후 9 13 22" src="https://github.com/user-attachments/assets/c35cc60e-efd5-49b7-9ec7-9a8ad0f0ed11">

 
#### ⚙️ **사용기술 및 환경**
| 분류 | 기술 | 
| --- | :--- | 
| 사용 언어 | HTML, CSS(SCSS), JavaScript(JSX) / Java / Python |
| 프론트엔드 라이브러리 | React |
| 백엔드 프레임워크 | Spring Boot - JPA / Flask | 
| 검색 엔진 | ElasticSearch | 
| RDBMS | MySQL | 
| 클라우드 스토리지 | Firebase Storage | 
| IDE | IntelliJ, VScode, MySQL WorkBench, DBeaver, Pycharm | 
| 협업 도구 | GitHub, Notion, Figma, Google Spreadsheet | 
| MockUp Tool | Figma | 
| 형상 관리 | Git, GitHub | 

- 동작 원리


![요청](https://github.com/ghkdtjsdud0312/finalprj_total_cinepic/assets/142463073/653e7fb2-faa0-466e-8b16-68979a833053)



 
---
 
