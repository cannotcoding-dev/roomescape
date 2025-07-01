import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { GameState, GameEffect, Item, EndingType } from '../types/game';
import { createItem } from '../data/items';

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  // Helper functions
  addItem: (item: Item) => void;
  removeItem: (itemId: string) => void;
  setFlag: (flag: string, value: boolean) => void;
  hasFlag: (flag: string) => boolean;
  hasItem: (itemId: string) => boolean;
  changeScene: (sceneId: string) => void;
  applyEffects: (effects: GameEffect[]) => void;
  saveGame: () => void;
  loadGame: () => void;
}

type GameAction =
  | { type: 'SET_PLAYER_NAME'; payload: string }
  | { type: 'CHANGE_SCENE'; payload: string }
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'SET_FLAG'; payload: { flag: string; value: boolean } }
  | { type: 'SET_GAME_PHASE'; payload: GameState['gamePhase'] }
  | { type: 'SET_ENDING'; payload: EndingType }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'RESET_GAME' }
  | { type: 'LOAD_GAME'; payload: Partial<GameState> };

const initialState: GameState = {
  playerName: '',
  currentScene: 'start',
  inventory: [],
  flags: {},
  progress: 0,
  timeRemaining: 30 * 60, // 30 minutes in seconds
  gamePhase: 'start',
  currentEnding: undefined,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.payload };
    
    case 'CHANGE_SCENE':
      return { ...state, currentScene: action.payload };
    
    case 'ADD_ITEM':
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        inventory: state.inventory.filter(item => item.id !== action.payload),
      };
    
    case 'SET_FLAG':
      return {
        ...state,
        flags: { ...state.flags, [action.payload.flag]: action.payload.value },
      };
    
    case 'SET_GAME_PHASE':
      return { ...state, gamePhase: action.payload };
    
    case 'SET_ENDING':
      return { ...state, currentEnding: action.payload, gamePhase: 'ending' };
    
    case 'UPDATE_TIME':
      return { ...state, timeRemaining: Math.max(0, state.timeRemaining + action.payload) };
    
    case 'RESET_GAME':
      return { ...initialState, playerName: state.playerName };
    
    case 'LOAD_GAME':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Helper functions
  const addItem = (item: Item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const setFlag = (flag: string, value: boolean) => {
    dispatch({ type: 'SET_FLAG', payload: { flag, value } });
  };

  const hasFlag = (flag: string): boolean => {
    return Boolean(state.flags[flag]);
  };

  const hasItem = (itemId: string): boolean => {
    return state.inventory.some(item => item.id === itemId);
  };

  const changeScene = (sceneId: string) => {
    dispatch({ type: 'CHANGE_SCENE', payload: sceneId });
  };

  const applyEffects = (effects: GameEffect[]) => {
    effects.forEach(effect => {
      switch (effect.type) {
        case 'addItem':
          try {
            const item = createItem(effect.target!);
            addItem(item);
          } catch (error) {
            console.error('Failed to add item:', effect.target, error);
          }
          break;
        case 'removeItem':
          removeItem(effect.value as string);
          break;
        case 'setFlag':
          setFlag(effect.target!, effect.value as boolean);
          break;
        case 'changeScene':
          changeScene(effect.value as string);
          break;
        case 'addTime':
        case 'removeTime':
          const timeChange = effect.type === 'addTime' ? 
            effect.value as number : 
            -(effect.value as number);
          dispatch({ type: 'UPDATE_TIME', payload: timeChange });
          break;
      }
    });
  };

  const saveGame = () => {
    const saveData = {
      ...state,
      savedAt: Date.now(),
    };
    localStorage.setItem('roomescape-save', JSON.stringify(saveData));
  };

  const loadGame = () => {
    const savedData = localStorage.getItem('roomescape-save');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        dispatch({ type: 'LOAD_GAME', payload: parsed });
      } catch (error) {
        console.error('Failed to load game:', error);
      }
    }
  };

  // Auto-save every 30 seconds during gameplay
  useEffect(() => {
    if (state.gamePhase === 'playing') {
      const interval = setInterval(saveGame, 30000);
      return () => clearInterval(interval);
    }
  }, [state.gamePhase]);

  // Timer countdown
  useEffect(() => {
    if (state.gamePhase === 'playing' && state.timeRemaining > 0) {
      const timer = setInterval(() => {
        dispatch({ type: 'UPDATE_TIME', payload: -1 });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state.gamePhase, state.timeRemaining]);

  const contextValue: GameContextType = {
    state,
    dispatch,
    addItem,
    removeItem,
    setFlag,
    hasFlag,
    hasItem,
    changeScene,
    applyEffects,
    saveGame,
    loadGame,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export default GameContext;