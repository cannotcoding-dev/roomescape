import { Item } from '../types/game';

export const gameItems: Record<string, Item> = {
  'mysterious-usb': {
    id: 'mysterious-usb',
    name: '수상한 USB',
    description: '화분 밑에서 발견한 USB 드라이브. 테이프로 붙어있었던 걸 보니 누군가 고의로 숨겨둔 것 같다.',
    type: 'usb',
    canCombine: ['computer'],
  },

  'family-photo': {
    id: 'family-photo',
    name: '가족사진',
    description: '김과장의 가족사진. 뒷면에 "사랑하는 아내 생일 - 2023.03.15"라고 적혀있다.',
    type: 'misc',
  },

  'desk-key': {
    id: 'desk-key',
    name: '책상 열쇠',
    description: '책상 서랍을 열 수 있는 작은 열쇠.',
    type: 'key',
    canCombine: ['desk-drawer'],
  },

  'password-note': {
    id: 'password-note',
    name: '비밀번호 메모',
    description: '컴퓨터 비밀번호가 적힌 포스트잇. "0315"라고 적혀있다.',
    type: 'note',
  },

  'phoenix-document': {
    id: 'phoenix-document',
    name: 'Phoenix 프로젝트 문서',
    description: '기밀로 분류된 프로젝트 문서. 회사의 핵심 기술 정보가 담겨있다.',
    type: 'document',
  },

  'backup-usb': {
    id: 'backup-usb',
    name: '백업 USB',
    description: '금고에서 발견한 추가 USB. 더 많은 증거가 들어있을 것 같다.',
    type: 'usb',
  },

  'contact-list': {
    id: 'contact-list',
    name: '연락처 목록',
    description: '수상한 외부 연락처들이 적힌 목록. 암호명으로 되어있다.',
    type: 'document',
  },

  'safe-combination': {
    id: 'safe-combination',
    name: '금고 조합 힌트',
    description: '"생년월일 + 입사년도"라고 적힌 메모.',
    type: 'note',
  },

  'phone-memo': {
    id: 'phone-memo',
    name: '전화 메모',
    description: '전화기 옆에 적힌 메모. "K - 9:30 PM, usual place"',
    type: 'note',
  },

  'coffee-receipt': {
    id: 'coffee-receipt',
    name: '커피 영수증',
    description: '커피머신 근처에서 발견한 영수증. 특별한 의미는 없어 보인다.',
    type: 'misc',
  },
};

export function getItem(itemId: string): Item | undefined {
  return gameItems[itemId];
}

export function createItem(itemId: string): Item {
  const itemTemplate = gameItems[itemId];
  if (!itemTemplate) {
    throw new Error(`Item ${itemId} not found`);
  }
  
  return {
    ...itemTemplate,
    isHidden: false,
  };
}