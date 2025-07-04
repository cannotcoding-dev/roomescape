# 🏢 RoomEscape: The Night Shift Mystery

야근 중 동료의 숨겨진 비밀을 파헤치는 몰입형 방탈출 게임

## 🎮 게임 소개

당신은 IT 회사 직장인입니다. 최근 수상한 행동을 보이는 동료 '김과장'의 비밀을 우연히 발견할 기회가 생겼습니다. 김과장이 급하게 자리를 비운 사이, 30분 안에 그의 진실을 밝혀내고 안전하게 탈출해야 합니다.

### 🌟 주요 특징

- **몰입감 있는 스토리**: 단순한 퍼즐 게임이 아닌 서사가 있는 미스터리
- **시각적 인터페이스**: 실제 컴퓨터 화면, 사무실 환경을 시뮬레이션
- **다양한 엔딩**: 선택에 따라 달라지는 4가지 결말
- **적절한 난이도**: 15분 내외의 부담 없는 플레이타임
- **즉시 플레이**: 닉네임만 입력하면 바로 시작

### 🎯 게임 목표

1. **증거 수집**: 김과장의 수상한 행동에 대한 증거 찾기
2. **미스터리 해결**: 숨겨진 진실 파악하기
3. **안전한 탈출**: 들키지 않고 사무실에서 빠져나가기

## 🖥️ 시각적 특징

### 컴퓨터 인터페이스
- 실제 윈도우즈 스타일 데스크탑 화면
- 이메일 클라이언트 (Outlook 스타일)
- 파일 탐색기
- 메모장, 계산기 등 기본 프로그램들

### 사무실 환경
- 책상 뷰: 컴퓨터, 전화기, 서류, 개인용품들
- 사무실 전체 뷰: 다른 책상들, 프린터, 커피머신
- 상황별 클로즈업: 금고, 서랍, 숨겨진 공간들

### UI 디자인
- 모던하고 깔끔한 사무실 테마
- 부드러운 전환 애니메이션
- 직관적인 클릭 인터페이스
- 몰입감을 높이는 타이핑 효과

## 🎮 게임 플로우

```
시작 화면 → 닉네임 입력 → 스토리 인트로
    ↓
김과장 책상 → 컴퓨터 화면 → 이메일 확인
    ↓
사무실 탐색 → 단서 수집 → 퍼즐 해결
    ↓
금고 발견 → 증거 확보 → 최종 선택
    ↓
엔딩 (4가지 분기)
```

## 🛠️ 기술 스택

- **프론트엔드**: React 18 + TypeScript
- **빌드 도구**: Vite
- **스타일링**: CSS Modules + Styled Components
- **애니메이션**: Framer Motion
- **상태관리**: React Context API
- **저장소**: LocalStorage
- **배포**: Vercel / Netlify

## 📁 프로젝트 구조

```
src/
├── components/           # React 컴포넌트
│   ├── ui/              # 기본 UI 컴포넌트
│   ├── game/            # 게임 관련 컴포넌트
│   ├── computer/        # 컴퓨터 화면 시뮬레이션
│   └── office/          # 사무실 환경 컴포넌트
├── contexts/            # 상태 관리
├── data/               # 게임 데이터
│   ├── story.ts        # 스토리 스크립트
│   ├── puzzles.ts      # 퍼즐 데이터
│   └── ui-data.ts      # UI 관련 데이터
├── hooks/              # 커스텀 훅
├── utils/              # 유틸리티 함수
├── types/              # TypeScript 타입
└── assets/             # 이미지, 아이콘 등
    ├── icons/          # UI 아이콘
    ├── sounds/         # 효과음 (선택사항)
    └── images/         # 배경 이미지
```

## 🎨 시각적 컴포넌트 설계

### 1. 컴퓨터 화면 컴포넌트
```typescript
// 윈도우즈 스타일 데스크탑
<DesktopScreen>
  <Taskbar />
  <DesktopIcons />
  <Window type="email" isOpen={true}>
    <EmailClient />
  </Window>
</DesktopScreen>
```

### 2. 사무실 환경 컴포넌트
```typescript
// 인터랙티브 사무실 뷰
<OfficeView location="desk">
  <InteractiveObject type="computer" onClick={handleClick} />
  <InteractiveObject type="drawer" locked={true} />
  <InteractiveObject type="plant" hasHidden={true} />
</OfficeView>
```

### 3. 퍼즐 인터페이스
```typescript
// 금고 다이얼 인터페이스
<SafeInterface>
  <DialWheel value={currentNumber} onChange={handleDial} />
  <DigitDisplay numbers={enteredNumbers} />
</SafeInterface>
```

## 🚀 개발 계획

### ✅ 완료된 개발 단계

#### Phase 1: 기본 구조 (Week 1) - COMPLETED
- [x] 프로젝트 설정 (Vite + React + TypeScript)
- [x] PRD 작성
- [x] 기본 컴포넌트 구조
- [x] 게임 상태 관리 시스템

#### Phase 2: 시각적 시스템 (Week 2) - COMPLETED
- [x] 컴퓨터 화면 시뮬레이션 (Windows 10 스타일)
- [x] 사무실 환경 디자인
- [x] 기본 애니메이션 및 트랜지션

#### Phase 3: 게임 로직 (Week 3) - COMPLETED
- [x] 완전한 스토리 시스템 (4개 엔딩)
- [x] 퍼즐 구현 (비밀번호, 이메일, USB, 금고)
- [x] 인벤토리 및 아이템 시스템

#### Phase 4: 콘텐츠 (Week 4) - COMPLETED
- [x] 모든 스토리 작성 (인트로부터 엔딩까지)
- [x] 시각적 요소 완성 (UI/UX)
- [x] 몰입감 있는 인터페이스

#### Phase 5: 완성도 (Week 5) - COMPLETED
- [x] 반응형 디자인 (모바일 대응)
- [x] 성능 최적화
- [x] 접근성 개선

#### Phase 6: 배포 준비 (Week 6) - READY
- [x] 프로덕션 빌드 준비
- [x] localhost 테스트 완료
- [x] 문서화 완료

## 🎮 플레이 방법

### 시작하기
1. **게임 시작**: 닉네임을 입력하고 "게임 시작" 클릭
2. **스토리 진행**: 선택지를 클릭하여 이야기 진행
3. **김과장 책상 탐색**: 컴퓨터, 전화기, 메모장 등 조사

### 컴퓨터 해킹
1. **컴퓨터 켜기**: 책상에서 컴퓨터 클릭
2. **비밀번호 찾기**: 가족사진 힌트 확인 (아내 생일: 0315)
3. **이메일 확인**: Outlook에서 수상한 이메일 발견
4. **파일 탐색**: 숨겨진 힌트 파일들 확인

### 물증 수집
1. **USB 찾기**: 이메일 단서로 "평소 장소" 탐색
2. **화분 조사**: USB 발견 및 획득
3. **금고 위치**: USB 파일에서 회의실 정보 확인
4. **금고 열기**: 생년월일+입사년도 조합 (850318)

### 엔딩 선택
- **안전한 선택**: 증거만 가지고 조용히 탈출
- **정의의 실현**: 즉시 당국에 신고
- **진실의 대가**: 더 깊이 조사 (위험)
- **히든 엔딩**: 특별 조건 만족 시 나타나는 숨겨진 결말

### 💡 게임 팁
- 📱 인벤토리 버튼(우상단)으로 수집한 아이템 확인
- ⏰ 타이머를 확인하며 시간 관리
- 💾 게임은 자동 저장됨 (LocalStorage)
- 🔄 다른 엔딩을 위해 재플레이 가능

## 🏆 엔딩 종류

- **🛡️ 안전한 선택**: 위험을 피하고 조용히 탈출
- **🔍 진실의 대가**: 모든 비밀을 밝혀내지만 위험에 노출
- **⚖️ 정의의 실현**: 적절한 증거로 정의를 실현
- **🤝 히든 엔딩**: 특별한 조건에서만 볼 수 있는 숨겨진 결말

## 📝 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes  
4. Push to the Branch
5. Open a Pull Request

---

**Made with ❤️ by daniel**

> 🕐 **플레이 시간**: 약 15분  
> 🎯 **난이도**: 쉬움  
> 🔄 **재플레이성**: 높음 (멀티 엔딩)  
> 📱 **플랫폼**: 웹 브라우저