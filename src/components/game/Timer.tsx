import React from 'react';
import { useGame } from '../../contexts/GameContext';
import './Timer.css';

export function Timer() {
  const { state } = useGame();

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerClass = (): string => {
    const timeLeft = state.timeRemaining;
    if (timeLeft <= 300) return 'timer--critical'; // 5 minutes
    if (timeLeft <= 600) return 'timer--warning';  // 10 minutes
    return 'timer--normal';
  };

  const getTimerIcon = (): string => {
    const timeLeft = state.timeRemaining;
    if (timeLeft <= 300) return '🚨';
    if (timeLeft <= 600) return '⚠️';
    return '⏰';
  };

  return (
    <div className={`timer ${getTimerClass()}`}>
      <div className="timer-content">
        <span className="timer-icon">{getTimerIcon()}</span>
        <div className="timer-info">
          <div className="timer-label">김과장 복귀까지</div>
          <div className="timer-value">{formatTime(state.timeRemaining)}</div>
        </div>
      </div>
    </div>
  );
}