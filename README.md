# 실행 방법
### `npm start`

# 프로젝트
📦 public 
│   ├── assets #디자인 파일 저장(img,svg)
│   │── index.html
│   ├── manifest.json
│   └── robots.txt
│
📦 src               
│   ├── 📂 component   # 재사용 가능한 UI 컴포넌트
│   │   ├── 📂 tabComponent  # 탭 관련 컴포넌트 모음
│   │   │   ├── Select.tsx   # 셀렉트 드롭다운 컴포넌트
│   │   │   ├── Tab.tsx      # 탭 컴포넌트
│   │   │   ├── TabHeaderData.tsx # 탭 헤더 데이터 관리
│   │   ├── Header.tsx      # 헤더 컴포넌트
│   │   ├── Pagenations.tsx # 페이지네이션 컴포넌트
│   │
│   ├── 📂 hooks       # 커스텀 훅 
│   │   ├── useSearchHistory.tsx   # 검색기록 커스텀 훅
│   │
│   ├── 📂 page        # 주요 페이지 컴포넌트
│   │   ├── BookList.tsx   # 도서 목록 페이지
│   │   ├── Main.tsx       # 메인 페이지
│   │   ├── SearchBook.tsx # 도서 검색 페이지
│   │
│   ├── 📂 style       # 스타일 관련 파일
│   │   ├── Text.ts    # 텍스트 스타일 관리
│   │   ├── Theme.ts   # 색색 스타일 관리
│   │
│   ├── api.ts         # API 호출 관련 함수
│   ├── App.test.js    # 애플리케이션 테스트 코드
│   ├── axios.ts       # Axios 설정 파일
│   ├── custom.d.ts    # 커스텀 타입 정의
│   ├── index.css      # 글로벌 스타일
│   ├── index.js       # 애플리케이션 진입점
│   ├── reportWebVitals.js # 성능 측정 코드
│   ├── setupTests.js  # 테스트 환경 설정
│   ├── styled.d.ts    # styled-components 타입 정의
│
├── .env.development   # 환경 변수 설정 파일
├── .gitignore         # Git에서 제외할 파일 목록
├── package.json       # 프로젝트 종속성 및 스크립트 정의


# 기타
재사용성을 높이기 위해, props를 활용하여 값이 변동되는 컴포넌트는 component 폴더에 따로 만들어 관리했습니다.
detailBookData?.status === "정상판매" 상품은 시각적으로 구분될 수 있도록 품절 처리했습니다.
작가가 여러 명일 경우, 가독성을 고려하여 외 n명 형식으로 표시했습니다.
제목이 너무 길 경우, 디자인 일관성을 유지하기 위해 ...으로 말줄임 처리했습니다.
책 상세 페이지에서 이미지가 없는 경우, 제목과 내용을 더 강조할 수 있도록 이미지 영역을 display: none 처리했습니다.
페이지네이션이 너무 많을 경우, 사용자의 편의성을 위해 "맨 처음으로" , "맨 끝으로" 이동할 수 있는 버튼을 추가했습니다.