import { StoryNode } from '../types/game';

export const storyNodes: Record<string, StoryNode> = {
  // 게임 시작
  start: {
    id: 'start',
    title: '게임 시작',
    description: '닉네임을 입력하고 게임을 시작하세요.',
    choices: [],
    backgroundType: 'office',
  },

  // 인트로 시퀀스
  intro: {
    id: 'intro',
    title: '야근하는 사무실',
    description: `시계가 밤 9시를 가리키고 있습니다. 대부분의 동료들은 퇴근했고, 사무실은 고요합니다.
    
김과장이 급하게 전화를 받더니 "잠깐만요, 급한 일이 생겨서..."라고 말하며 서둘러 나갔습니다.

지금이 기회입니다. 그의 책상 주변을 조사해볼 시간입니다.`,
    choices: [
      {
        id: 'start-investigation',
        text: '김과장의 책상으로 이동한다',
        nextNode: 'desk-area',
        effects: [
          { type: 'setFlag', target: 'intro_seen', value: true },
          { type: 'changeScene', value: 'desk-area' }
        ]
      }
    ],
    backgroundType: 'office',
  },

  // 김과장 책상 구역
  'desk-area': {
    id: 'desk-area',
    title: '김과장의 책상',
    description: `깔끔하게 정리된 책상입니다. 컴퓨터 모니터는 꺼져있고, 옆에는 가족사진이 놓여있습니다.
    
책상 위에 보이는 것들:
- 🖥️ 컴퓨터 (전원이 꺼져있음)
- 📞 전화기 (빨간 불이 깜빡임)
- 📋 메모장 (무언가 적혀있음)
- 🌱 작은 화분 (물이 마른 상태)
- 🗃️ 서랍 (잠겨있음)

시간이 많지 않습니다. 무엇부터 조사하시겠습니까?`,
    choices: [
      {
        id: 'check-computer',
        text: '💻 컴퓨터를 켜본다',
        nextNode: 'computer-login',
        effects: [{ type: 'setFlag', target: 'computer_accessed', value: true }]
      },
      {
        id: 'check-phone',
        text: '📞 전화기를 확인한다',
        nextNode: 'phone-messages',
        effects: [{ type: 'setFlag', target: 'phone_checked', value: true }]
      },
      {
        id: 'read-notes',
        text: '📋 메모장을 읽어본다',
        nextNode: 'memo-clues',
        effects: [{ type: 'setFlag', target: 'memo_read', value: true }]
      },
      {
        id: 'examine-plant',
        text: '🌱 화분을 자세히 살펴본다',
        nextNode: 'plant-discovery',
        effects: [{ type: 'setFlag', target: 'plant_examined', value: true }]
      },
      {
        id: 'try-drawer',
        text: '🗃️ 서랍을 열어보려 시도한다',
        nextNode: 'locked-drawer',
        effects: [{ type: 'setFlag', target: 'drawer_attempted', value: true }]
      }
    ],
    backgroundType: 'office',
    timeLimit: 1800, // 30 minutes
  },

  // 컴퓨터 로그인 화면
  'computer-login': {
    id: 'computer-login',
    title: '컴퓨터 로그인',
    description: `컴퓨터가 부팅되었습니다. Windows 로그인 화면이 나타납니다.

사용자: 김민수
비밀번호: [____]

책상 주변을 더 살펴보면 비밀번호 힌트를 찾을 수 있을 것 같습니다.`,
    choices: [
      {
        id: 'look-for-password-hint',
        text: '💡 비밀번호 힌트를 찾아본다',
        nextNode: 'password-hunt',
        effects: [{ type: 'setFlag', target: 'searching_password', value: true }]
      },
      {
        id: 'try-common-passwords',
        text: '🔑 일반적인 비밀번호를 시도해본다',
        nextNode: 'password-attempts',
        effects: [{ type: 'setFlag', target: 'trying_passwords', value: true }]
      },
      {
        id: 'back-to-desk',
        text: '⬅️ 다른 것을 먼저 조사한다',
        nextNode: 'desk-area',
        effects: []
      }
    ],
    backgroundType: 'computer',
  },

  // 비밀번호 힌트 찾기
  'password-hunt': {
    id: 'password-hunt',
    title: '비밀번호 단서 찾기',
    description: `책상 주변을 자세히 살펴보니 가족사진이 눈에 띕니다.

사진 속에는 김과장, 아내, 그리고 어린 딸이 함께 찍혀있습니다. 
사진 뒷면에 "사랑하는 아내 생일 - 2023.03.15"라고 적혀있습니다.

비밀번호가 생일과 관련이 있을 것 같습니다.`,
    choices: [
      {
        id: 'try-wife-birthday',
        text: '🎂 아내 생일을 입력해본다 (0315)',
        nextNode: 'login-success',
        requirements: [],
        effects: [
          { type: 'setFlag', target: 'computer_unlocked', value: true },
          { type: 'setFlag', target: 'password_found', value: true }
        ]
      },
      {
        id: 'try-date-variations',
        text: '📅 다른 날짜 조합을 시도해본다',
        nextNode: 'password-attempts',
        effects: []
      }
    ],
    backgroundType: 'computer',
  },

  // 로그인 성공
  'login-success': {
    id: 'login-success',
    title: '컴퓨터 접근 성공',
    description: `축하합니다! 컴퓨터에 로그인했습니다.

바탕화면에 여러 아이콘들이 보입니다:
- 📧 이메일 (Outlook)
- 📁 내 문서
- 🗂️ 업무 폴더
- ♻️ 휴지통

새로운 이메일 알림이 깜빡이고 있습니다. 무엇을 먼저 확인하시겠습니까?`,
    choices: [
      {
        id: 'check-email',
        text: '📧 이메일을 확인한다',
        nextNode: 'email-discovery',
        effects: [{ type: 'setFlag', target: 'email_accessed', value: true }]
      },
      {
        id: 'browse-documents',
        text: '📁 문서 폴더를 뒤져본다',
        nextNode: 'document-search',
        effects: [{ type: 'setFlag', target: 'documents_searched', value: true }]
      },
      {
        id: 'check-trash',
        text: '♻️ 휴지통을 확인한다',
        nextNode: 'trash-investigation',
        effects: [{ type: 'setFlag', target: 'trash_checked', value: true }]
      }
    ],
    backgroundType: 'computer',
  },

  // 이메일 발견
  'email-discovery': {
    id: 'email-discovery',
    title: '수상한 이메일',
    description: `받은 편지함에 어제 밤에 온 수상한 이메일이 있습니다.

발신자: unknown@secretmail.com
제목: "내일 밤 계획"

내용:
"김 과장님,
내일 밤 9시 30분 이후에 '물건'을 평소 장소에 놓아두세요.
절대 다른 사람이 보면 안 됩니다.
확인 후 연락드리겠습니다.
- K"

'평소 장소'가 어디일까요? 사무실 어딘가에 숨겨둔 것 같습니다.`,
    choices: [
      {
        id: 'search-office',
        text: '🔍 사무실에서 숨겨진 장소를 찾아본다',
        nextNode: 'office-search',
        effects: [{ type: 'setFlag', target: 'email_clue_found', value: true }]
      },
      {
        id: 'check-more-emails',
        text: '📧 다른 이메일도 확인해본다',
        nextNode: 'more-emails',
        effects: []
      },
      {
        id: 'back-to-desktop',
        text: '⬅️ 바탕화면으로 돌아간다',
        nextNode: 'login-success',
        effects: []
      }
    ],
    backgroundType: 'computer',
  },

  // 사무실 수색
  'office-search': {
    id: 'office-search',
    title: '숨겨진 장소 찾기',
    description: `'평소 장소'라는 단서를 바탕으로 사무실을 둘러봅니다.

가능한 장소들:
- ☕ 커피머신 근처 (김과장이 자주 커피를 마심)
- 📚 책장 뒤편 (높은 곳이라 잘 안 보임)
- 🌱 화분 아래 (이미 살펴본 화분)
- 🖨️ 프린터 근처 (자주 사용하는 장소)
- 🚪 회의실 (가끔 혼자 들어감)

어디를 먼저 조사하시겠습니까?`,
    choices: [
      {
        id: 'check-coffee-machine',
        text: '☕ 커피머신 주변을 조사한다',
        nextNode: 'coffee-area',
        effects: []
      },
      {
        id: 'examine-bookshelf',
        text: '📚 책장을 자세히 살펴본다',
        nextNode: 'bookshelf-discovery',
        effects: []
      },
      {
        id: 'revisit-plant',
        text: '🌱 화분을 다시 조사한다',
        nextNode: 'plant-secret',
        effects: []
      },
      {
        id: 'check-printer',
        text: '🖨️ 프린터 구역을 확인한다',
        nextNode: 'printer-area',
        effects: []
      }
    ],
    backgroundType: 'office',
  },

  // 화분의 비밀 발견
  'plant-secret': {
    id: 'plant-secret',
    title: '화분의 비밀',
    description: `화분을 들어올려보니 밑에 작은 USB가 테이프로 붙어있습니다!

이것이 바로 '물건'인 것 같습니다. USB를 획득했습니다.

USB를 컴퓨터에 연결하면 무엇을 발견할 수 있을까요?`,
    choices: [
      {
        id: 'plug-usb',
        text: '💾 USB를 컴퓨터에 연결한다',
        nextNode: 'usb-contents',
        effects: [
          { type: 'addItem', value: 'usb', target: 'mysterious-usb' },
          { type: 'setFlag', target: 'usb_found', value: true }
        ]
      },
      {
        id: 'examine-usb-first',
        text: '🔍 USB를 먼저 자세히 살펴본다',
        nextNode: 'usb-examination',
        effects: [
          { type: 'addItem', value: 'usb', target: 'mysterious-usb' }
        ]
      }
    ],
    backgroundType: 'office',
  },

  // USB 내용 확인
  'usb-contents': {
    id: 'usb-contents',
    title: 'USB의 비밀',
    description: `USB를 연결하자 비밀번호로 보호된 폴더가 나타납니다.

폴더명: "Project_Phoenix"
암호: [____]

그리고 USB 루트에 "README.txt" 파일이 하나 있습니다.

내용:
"금고 위치: 회의실 화이트보드 뒤
조합: 생년월일 + 입사년도
중요: 절대 발각되면 안 됨"

드디어 금고의 위치를 찾았습니다!`,
    choices: [
      {
        id: 'head-to-meeting-room',
        text: '🚪 회의실로 이동한다',
        nextNode: 'meeting-room',
        effects: [{ type: 'setFlag', target: 'safe_location_known', value: true }]
      },
      {
        id: 'try-unlock-folder',
        text: '🔐 폴더 비밀번호를 추측해본다',
        nextNode: 'folder-puzzle',
        effects: []
      },
      {
        id: 'gather-more-info',
        text: '📋 더 많은 정보를 수집한다',
        nextNode: 'desk-area',
        effects: []
      }
    ],
    backgroundType: 'computer',
  },

  // 회의실 조사
  'meeting-room': {
    id: 'meeting-room',
    title: '회의실의 금고',
    description: `회의실에 들어왔습니다. 화이트보드 뒤를 살펴보니 정말로 작은 벽장이 있고, 그 안에 전자 금고가 숨겨져 있습니다!

금고에는 숫자 키패드가 있습니다: [_] [_] [_] [_] [_] [_]

김과장의 정보:
- 생년월일: 1985년 3월 22일 (850322)
- 입사년도: 2018년

조합을 입력해보세요.`,
    choices: [
      {
        id: 'try-birth-hire',
        text: '🔢 생년월일(850322) + 입사년도(2018) = 8503222018',
        nextNode: 'safe-too-long',
        effects: []
      },
      {
        id: 'try-short-combo',
        text: '🔢 8503 + 18 = 850318',
        nextNode: 'safe-success',
        effects: [{ type: 'setFlag', target: 'safe_opened', value: true }]
      },
      {
        id: 'try-other-combo',
        text: '🔢 다른 조합을 시도해본다',
        nextNode: 'safe-attempts',
        effects: []
      }
    ],
    backgroundType: 'office',
  },

  // 금고 열기 성공
  'safe-success': {
    id: 'safe-success',
    title: '금고의 내용물',
    description: `금고가 열렸습니다! 안에서 다음 물건들을 발견했습니다:

📄 기밀 문서들 - "Phoenix 프로젝트 계약서"
💰 현금 다발 (상당한 금액)
📱 별도의 휴대폰
💾 추가 USB 드라이브
📋 손글씨 메모: "만약의 사태에 대비한 백업 계획"

이제 김과장의 비밀을 알았습니다. 그는 회사 기밀을 외부에 유출하고 있었던 것 같습니다.

어떻게 하시겠습니까?`,
    choices: [
      {
        id: 'take-evidence-leave',
        text: '📄 증거만 가지고 조용히 탈출한다',
        nextNode: 'ending-safe',
        effects: [{ type: 'setFlag', target: 'evidence_taken', value: true }]
      },
      {
        id: 'investigate-further',
        text: '🔍 더 깊이 조사한다 (위험)',
        nextNode: 'deeper-investigation',
        effects: [{ type: 'setFlag', target: 'took_risk', value: true }]
      },
      {
        id: 'call-authorities',
        text: '📞 즉시 관련 당국에 신고한다',
        nextNode: 'ending-justice',
        effects: [{ type: 'setFlag', target: 'called_police', value: true }]
      },
      {
        id: 'confront-kim',
        text: '💬 김과장과 직접 대화하기로 한다',
        nextNode: 'hidden-path',
        requirements: ['usb_found', 'email_clue_found'],
        effects: [{ type: 'setFlag', target: 'chose_confrontation', value: true }]
      }
    ],
    backgroundType: 'office',
  },

  // 엔딩들
  'ending-safe': {
    id: 'ending-safe',
    title: '안전한 선택',
    description: `당신은 적당한 증거만 확보하고 조용히 사무실을 떠났습니다.

다음 날, 익명으로 회사 내부 감사팀에 제보했습니다. 김과장은 조용히 해고되었고, 더 큰 문제로 번지지 않았습니다.

때로는 신중한 선택이 최선의 결과를 가져다줍니다.

🛡️ 엔딩: 안전한 선택
⏱️ 플레이 시간: 약 15분
🎯 당신의 선택: 위험을 피하고 적절한 선에서 문제를 해결했습니다.`,
    choices: [
      {
        id: 'play-again',
        text: '🔄 다른 선택으로 다시 플레이',
        nextNode: 'start',
        effects: [{ type: 'setFlag', target: 'game_completed', value: true }]
      }
    ],
    backgroundType: 'office',
  },

  'ending-justice': {
    id: 'ending-justice',
    title: '정의의 실현',
    description: `당신은 즉시 관련 당국에 신고했습니다.

수사 결과, 김과장은 산업스파이 조직의 일원이었고 회사의 핵심 기술을 빼돌리고 있었습니다. 당신의 신속한 신고로 더 큰 피해를 막을 수 있었습니다.

회사에서는 당신에게 특별 포상을 수여했고, 보안 시스템도 크게 강화되었습니다.

⚖️ 엔딩: 정의의 실현
⏱️ 플레이 시간: 약 15분
🎯 당신의 선택: 옳은 일을 위해 용기 있게 행동했습니다.`,
    choices: [
      {
        id: 'play-again',
        text: '🔄 다른 선택으로 다시 플레이',
        nextNode: 'start',
        effects: [{ type: 'setFlag', target: 'game_completed', value: true }]
      }
    ],
    backgroundType: 'office',
  },

  'ending-truth': {
    id: 'ending-truth',
    title: '진실의 대가',
    description: `더 깊이 조사한 결과, 당신은 엄청난 진실을 발견했습니다.

김과장뿐만 아니라 회사 임원진의 일부도 이 일에 연루되어 있었습니다. 하지만 너무 깊이 파고든 당신을 누군가 목격했고...

다음 날부터 당신은 계속해서 감시받는 느낌을 받게 됩니다. 진실을 아는 것은 때로 큰 부담이 됩니다.

🔍 엔딩: 진실의 대가
⏱️ 플레이 시간: 약 20분
🎯 당신의 선택: 모든 진실을 밝혀냈지만, 그에 따른 위험도 감수해야 합니다.`,
    choices: [
      {
        id: 'play-again',
        text: '🔄 다른 선택으로 다시 플레이',
        nextNode: 'start',
        effects: [{ type: 'setFlag', target: 'game_completed', value: true }]
      }
    ],
    backgroundType: 'office',
  },

  'ending-hidden': {
    id: 'ending-hidden',
    title: '예상치 못한 동맹',
    description: `김과장과의 대화에서 놀라운 사실을 알게 되었습니다.

그는 실제로는 내부 감사팀의 비밀 요원이었고, 더 큰 부패 조직을 잡기 위해 잠입해 있었던 것입니다. 당신의 조사 능력에 감명받은 그는 당신에게 함께 일하자고 제안합니다.

당신은 회사의 비밀 보안팀에 합류하게 되었습니다.

🤝 엔딩: 예상치 못한 동맹
⏱️ 플레이 시간: 약 18분
🎯 당신의 선택: 상황을 다르게 바라보고 새로운 기회를 얻었습니다.

🎉 숨겨진 엔딩을 발견했습니다!`,
    choices: [
      {
        id: 'play-again',
        text: '🔄 다른 선택으로 다시 플레이',
        nextNode: 'start',
        effects: [{ type: 'setFlag', target: 'game_completed', value: true }]
      }
    ],
    backgroundType: 'office',
  },
};

export default storyNodes;