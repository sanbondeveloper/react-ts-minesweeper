# 지뢰찾기

- [프로젝트 소개](#프로젝트-소개)
  - [주요 기능](#주요-기능)
  - [성능 최적화의 고민](#성능-최적화의-고민)
- [설치 가이드](#설치-가이드)
- [기술 스택](#기술-스택)

## 프로젝트 소개
추억의 지뢰찾기 게임

- 개인 프로젝트
- 개발 기간: 약 1주
- 배포 주소: https://harmonious-taiyaki-c3efc2.netlify.app/

### 주요 기능

![May-18-2025 19-57-49](https://github.com/user-attachments/assets/42283347-9e48-42b3-8c62-ab42da67573c)

**지뢰 배치**

- 지뢰 위치를 무작위로 배치하기 위해 Fisher–Yates 알고리즘 기반의 셔플 로직을 구현하여, 모든 셀에 균등한 확률로 지뢰가 배치되도록 초기화했습니다.
- 첫 클릭한 셀에 지뢰가 배치되지 않도록, 입력 이후에 안전 구역을 제외한 무작위 셀에 지뢰를 배치하도록 구현했습니다.

**셀 열기**

- 사용자가 셀을 클릭하면 해당 셀 기준으로 8방향 주변 셀을 탐색하여 인접한 지뢰의 개수를 표시합니다.
- 인접한 지뢰가 없는 셀 클릭 시 BFS 알고리즘으로 연결된 빈 셀을 자동으로 개방합니다.

**플래그**

- 우클릭시 셀에 플래그(깃발)를 표시

**힌트 제공**

- 오픈된 셀을 다시 클릭할 경우, 주변 셀의 플래그 수와 실제 지뢰 수를 비교하여 지뢰가 있을 가능성이 높은 셀에 시각적 힌트를 제공합니다.
- 만약, 주변에 지뢰가 없으면 지뢰가 없을 때까지 셀을 오픈합니다.
- 힌트를 제공하기 위해 `setTimeout` 함수를 사용해 셀이 파란색으로 반짝이게 했습니다.

**타이머**

- 실시간으로 경과 시간을 표시하는 타이머 기능을 구현했습니다.

**게임 난이도 설정**

- 게임 난이도 설정에 따라 게임판의 크기와 지뢰 개수를 동적으로 변경할 수 있도록 구현했습니다.

### 성능 최적화 고민

**시간 복잡도 최소화**

- 높이와 너비가 최대 100으로 모수가 프로그램 성능에 영향을 줄 만큼 크지는 않지만 모든 연산에서 시간복잡도가 `O(N^2)`을 넘지 않도록 구현했습니다.

**Web Worker를 사용한 타이머 구현**

- 타이머 기능을 메인 스레드가 아닌 별도의 분리된 스레드에서 처리하여 메인 스레드의 성능에 영향을 주지 않도록 했습니다.

## 설치 가이드

- node: v18.17.1
- npm: v9.6.7

```
npm install
npm run build
npm run preview
```

## 기술 스택

**환경**

<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

**프론트엔드**

<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">

<img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white">
