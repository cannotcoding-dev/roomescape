# 방탈출 게임 Pre-PRD (Product Requirements Document)

## 1. 프로젝트 개요

### 프로젝트명: RoomEscape
브라우저에서 즐기는 몰입형 싱글플레이어 방탈출 게임

### 비전
빠른 개발과 깊은 몰입감을 동시에 제공하는 방탈출 경험

### 목표
- 혼자서도 재미있는 방탈출 게임 개발
- 몰입감 있는 이펙트와 사운드 제공
- 다양한 해결 루트가 있는 퍼즐 설계

## 2. 핵심 기능

### 2.1 간단한 시작
- 닉네임 입력만으로 게임 시작
- 로컬 스토리지로 진행상황 저장
- 바로 게임 진입

### 2.2 게임 시스템
- 클릭 기반 인터랙션
- 인벤토리 시스템
- 다양한 해결 루트
- 몰입감 있는 이펙트 (파티클, 애니메이션)
- 배경음악 및 효과음

### 2.3 방탈출 방 (미스터리 오피스 테마)
- 현대적인 사무실 배경
- 다층적 퍼즐 구조
- 히든 엘리먼트 발견
- 아이템 조합 시스템
- 여러 엔딩 루트

## 3. 기술 요구사항

### 3.1 프론트엔드 (클라이언트 사이드만)
- **프레임워크**: React.js with TypeScript
- **상태관리**: React Context API
- **스타일링**: 간단한 CSS
- **저장소**: LocalStorage
- **빌드**: Vite

### 3.2 백엔드
- 없음 (정적 사이트)

### 3.3 배포
- **호스팅**: Vercel or Netlify

## 4. 사용자 경험 (UX)

### 4.1 사용자 플로우
1. 사이트 접속 → 닉네임 입력
2. 게임 시작 → 오피스 화면 진입
3. 클릭 탐색 → 퍼즐 해결
4. 엔딩 → 다른 루트 도전 가능

### 4.2 주요 화면
- 시작 화면 (닉네임 입력, 게임 시작)
- 게임 화면 (방 전체 뷰, 인벤토리, 효과)
- 퍼즐 상세 화면 (확대된 오브젝트 뷰)
- 엔딩 화면 (달성 시간, 발견한 루트)

## 5. 게임 메커니즘

### 5.1 퍼즐 유형
- 수학 문제
- 논리 퍼즐
- 단어 퍼즐
- 패턴 인식
- 아이템 조합
- 순서 기억
- 숨겨진 오브젝트 찾기

### 5.2 몰입 요소
- 클릭 시 시각적 피드백
- 성공/실패 사운드 효과
- 부드러운 화면 전환
- 파티클 이펙트
- 환경음 (사무실 소음, 시계 소리 등)

### 5.3 진행 시스템
- 단계별 잠금 해제
- 자유로운 탐색 방식
- 힌트 시스템 (무제한, 단계별)
- 여러 해결 경로 존재

## 6. 개발 일정

### Phase 1: 기본 구조 (1주)
- Vite + React + TypeScript 설정
- 기본 컴포넌트 구조
- 게임 상태 관리

### Phase 2: 게임 엔진 (2주)
- 인벤토리 시스템
- 인터랙션 시스템
- 퍼즐 엔진 기본 구조

### Phase 3: 콘텐츠 제작 (2주)
- 오피스 배경 및 UI
- 퍼즐 구현 (5-7개)
- 이펙트 및 사운드

### Phase 4: 완성도 (1주)
- 테스트 및 버그 수정
- 성능 최적화
- 배포

## 7. 성공 지표

### 7.1 사용자 경험 지표
- 게임 완료율
- 평균 플레이 시간
- 재플레이율 (다른 루트 시도)
- 사용자 피드백

### 7.2 게임 지표
- 평균 클리어 시간
- 힌트 사용 패턴
- 각 루트별 선택률
- 포기율 (어느 단계에서)

## 8. 오피스 테마 상세 설계

### 8.1 배경 설정
- 야근하는 사무실
- 수상한 동료의 책상
- 숨겨진 비밀 발견

### 8.2 주요 오브젝트
- 컴퓨터 (비밀번호, 파일)
- 금고 (조합 번호)
- 책장 (숨겨진 열쇠)
- 화이트보드 (힌트 메모)
- 커피머신 (동작 퍼즐)
- 프린터 (코드 출력)

### 8.3 엔딩 루트
- 루트 A: 직접적 증거 발견
- 루트 B: 우회적 단서 수집
- 루트 C: 숨겨진 비밀 발견

## 9. 확장 가능성

### 9.1 추가 테마 아이디어
- 집 (아늑한 미스터리)
- 학교 (노스탤지어 + 퍼즐)
- 카페 (따뜻한 분위기 + 추리)

### 9.2 기능 확장
- 달성도 시스템
- 히든 엔딩
- 스피드런 모드