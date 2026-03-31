# 📌 oz_externship_fe_07_team1

커뮤니티 페이지 구현

---

## 📖 프로젝트 소개

사용자가 게시글을 작성하고 공유할 수 있는 커뮤니티 서비스입니다.  
게시글 작성, 수정, 삭제 및 댓글과 좋아요 기능을 통해 사용자 간 상호작용이 가능합니다.  
React와 React Query를 활용하여 서버 상태를 효율적으로 관리하고 API 기반 구조로 구현했습니다.

---

## 팀소개

본 프로젝트는 커뮤니티 서비스 구현을 목표로 프론트엔드 중심으로 협업하여 진행되었습니다.  
팀원들은 기능 단위로 역할을 분담하여 게시글, 댓글, 인증 등 주요 기능을 구현하였고,  
React Query와 Zustand를 활용해 상태 관리를 효율적으로 처리했습니다.

또한 Git을 기반으로 브랜치 전략과 코드 리뷰를 통해 협업을 진행하며,  
일관된 코드 스타일과 구조를 유지하는 데 집중했습니다.

---

## 팀동료

### FE

| <a href="https://github.com/sysysysyb"><img src="https://github.com/sysysysyb.png" width=100px/><br/><sub><b>@sysysysyb</b></sub></a><br/> | <a href="https://github.com/hj-devlog"><img src="https://github.com/hj-devlog.png" width=100px/><br/><sub><b>@hj-devlog</b></sub></a><br/> | <a href="https://github.com/ninanochichi"><img src="https://github.com/ninanochichi.png" width=100px/><br/><sub><b>@ninanochichi</b></sub></a><br/> |
| :----------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                               백서영 (조교)                                                                |                                                               진현진 (팀장)                                                                |                                                                    김우진 (팀원)                                                                    |

---

## 🔗 배포 링크

👉 [서비스 바로가기](https://my.ozcodingschool.site/)

---

## 🧩 주요 기능

- 게시글 목록 조회
- 게시글 상세 조회
- 게시글 작성 / 수정 / 삭제
- 댓글 기능
- 좋아요 기능

---

## 🏗️ 아키텍처

![architecture](./assets/architecture.png)

> 사용자 → 프론트엔드 → 백엔드 API → 데이터베이스 구조

---

## 📁 폴더 구조

```plaintext
src/
├── api/
├── assets/
├── components/
│   ├── common/
│   ├── community/
│   ├── editor/
│   └── layout/
├── constants/
├── hooks/
│   └── queries/
├── lib/
├── mocks/
│   ├── data/
│   └── handlers/
├── pages/
├── store/
├── types/
│   ├── api-request-types/
│   └── api-response-types/
├── utils/
```

---

## ⚙️ 주요 구현 포인트

- React Query를 활용한 서버 상태 관리
- Axios interceptor를 통한 인증 처리
- Optimistic Update 적용
- MSW를 활용한 API mocking
- Zustand를 활용한 전역 상태 관리 (토큰, 유저 정보)
- 컴포넌트 단위 분리 및 재사용성 고려 설계
- Markdown Editor 적용 및 실시간 미리보기 기능
- ESLint + Prettier + Husky를 통한 코드 품질 관리

---

## 📌 페이지 구성

- 게시글 목록 페이지
- 게시글 상세 페이지
- 게시글 작성 페이지
- 게시글 수정 페이지

---

## 📸 화면 미리보기

### 📝 게시글 목록 페이지

![list](./assets/list.png)

### ✏️ 게시글 작성 페이지

![create](./assets/create.png)

### 📄 게시글 상세 페이지

![detail](./assets/detail.png)

### 🛠 게시글 수정 페이지

![edit](./assets/edit.png)

## 🚀 실행 방법

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## ⚙️ 환경 변수

프로젝트 실행 전 .env 파일을 생성해주세요.

```bash
VITE_API_BASE_URL=YOUR_API_URL
VITE_MSW_BASE_URL=YOUR_MSW_URL
VITE_TEMPORARY_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
```
