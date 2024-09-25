<!-- prettier-ignore-start -->
# 슬라이드 투 두 프로젝트

## 프로젝트 소개

Expo의 사용법과 활용법을 알고자 진행한 프로젝트 입니다.
사용자가 스마트 기기로 목표, 할일과, 노트를 작성하고 할일에 대한 %를 알려주는 어플리케이션 입니다.

## 앱 다운로드

[v1.0.0](https://github.com/Banal972/SlideTodo/releases/tag/v1.0.0)

## 개발 기간

2024.07 ~ 2024.09

개발팀 소개 
--

|<center>김지유</center>|
|:--------------------------------:|
|<img src="https://github.com/user-attachments/assets/43cc11a4-b1a1-404c-b0ce-09ce96e666b0" width="160"/>|
|[@Banal972](https://github.com/Banal972)|


## 시작 가이드
### Requirements

- [Node.js 20.16.0](https://nodejs.org/en/blog/release/v20.16.0)
- [Npm 10.8.1](https://www.npmjs.com/package/npm/v/10.8.1)

### Installation
``` bash
$ git clone https://github.com/Banal972/SlideTodo.git
$ cd SlideTodo
$ nvm use v.20.16.0
$ npm install
$ npm run dev
```

기술 스택 ⚙️
--

### Development
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)


화면 구성
--

|<center>로그인 페이지</center>|<center>회원가입 페이지</center>|
|:----:|:----:|
|![slidetodo_img01](https://github.com/user-attachments/assets/9c766d97-fb3d-4b69-ae86-de2dfaaacabc)|![slidetodo_img02](https://github.com/user-attachments/assets/4210b329-47df-4fa2-ad7d-010c54da4fcc)
|대시보드|Drawer 메뉴|
![slidetodo_img03](https://github.com/user-attachments/assets/799c1e24-84d8-4264-9eab-53e357111d60)|![slidetodo_img04](https://github.com/user-attachments/assets/18a0e4fc-0617-4560-9248-107e869db7e7)
|목표 페이지|목표별 노트 페이지|
![slidetodo_img05](https://github.com/user-attachments/assets/2a700562-5c7a-4988-9414-c0fd3d2b263c)|![slidetodo_img06](https://github.com/user-attachments/assets/2bfab762-dc46-4a3e-a299-f4306d116a1e)


## 주요기능

- 목표를 생성하고 해당 목표에 대한 할일을 등록합니다.
- 할일을 완수하면 완수한 %를 그래프로 표시 합니다.
- 할일에 대한 노트를 작성할 수 있습니다.
- 할일, 완수한 할일, 목표별 할일 등 선택적으로 확인이 가능합니다.

## 신경쓴 점
- Zustand를 이용해 모달창을 한번에 관리 하여 props drolling을 최소화
- Expo를 사용하여 파일기반으로 라우팅을 작성하여 컴포넌트를 최소화
- Drawer를 이용하여 메뉴 레이아웃을 개선
- TanStack-Query를 이용하여 캐시 관리
- expo-build-properties를 이용하여 빌드 용량 최소화

## 타입스크립트 분리
- 같은 동작을 하는 타입이 여러 번 중복 선언될 필요 없어 중복 타입 최소화
- 타입스크립트의 유틸리티를 활용하여 중복을 제거
- 가독성 향상 과 개발 효율 및 실수 방지

<!-- prettier-ignore-end -->
