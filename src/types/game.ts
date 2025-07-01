export interface GameState {
  playerName: string;
  currentScene: string;
  inventory: Item[];
  flags: Record<string, boolean>;
  progress: number;
  timeRemaining: number;
  gamePhase: 'start' | 'intro' | 'playing' | 'ending';
  currentEnding?: EndingType;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: 'key' | 'document' | 'usb' | 'note' | 'misc';
  canCombine?: string[];
  isHidden?: boolean;
}

export interface StoryNode {
  id: string;
  title: string;
  description: string;
  choices: Choice[];
  requirements?: string[];
  effects?: GameEffect[];
  timeLimit?: number;
  backgroundType?: 'office' | 'computer' | 'close-up';
}

export interface Choice {
  id: string;
  text: string;
  nextNode: string;
  requirements?: string[];
  effects?: GameEffect[];
  isDisabled?: boolean;
  disabledReason?: string;
}

export interface GameEffect {
  type: 'addItem' | 'removeItem' | 'setFlag' | 'changeScene' | 'addTime' | 'removeTime';
  value: string | boolean | number;
  target?: string;
}

export interface Puzzle {
  id: string;
  name: string;
  description: string;
  type: 'password' | 'combination' | 'sequence' | 'hidden-object' | 'logic';
  solution: string | number | string[];
  hints: string[];
  isCompleted: boolean;
  attempts: number;
  maxAttempts?: number;
}

export type EndingType = 'safe' | 'truth' | 'justice' | 'hidden';

export interface Ending {
  id: EndingType;
  title: string;
  description: string;
  requirements: string[];
  isUnlocked: boolean;
}

export interface SaveData {
  playerName: string;
  completedEndings: EndingType[];
  totalPlaytime: number;
  lastPlayed: number;
  achievements: string[];
}