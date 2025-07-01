import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { storyNodes } from '../../data/story';
import { Button } from '../ui/Button';
import { Timer } from './Timer';
import { Inventory } from './Inventory';
import './GameScreen.css';

export function GameScreen() {
  const { state, applyEffects, changeScene } = useGame();
  const currentNode = storyNodes[state.currentScene];

  if (!currentNode) {
    return (
      <div className="game-screen error">
        <h2>오류가 발생했습니다</h2>
        <p>현재 장면을 찾을 수 없습니다: {state.currentScene}</p>
      </div>
    );
  }

  const handleChoice = (choice: any) => {
    // Check requirements
    if (choice.requirements) {
      const hasRequirements = choice.requirements.every((req: string) => {
        return state.flags[req] || state.inventory.some(item => item.id === req);
      });

      if (!hasRequirements) {
        return; // Can't select this choice
      }
    }

    // Apply effects
    if (choice.effects) {
      applyEffects(choice.effects);
    }

    // Change scene
    if (choice.nextNode) {
      changeScene(choice.nextNode);
    }
  };

  const formatDescription = (text: string) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const isChoiceDisabled = (choice: any) => {
    if (choice.requirements) {
      return !choice.requirements.every((req: string) => {
        return state.flags[req] || state.inventory.some(item => item.id === req);
      });
    }
    return false;
  };

  const getChoiceTooltip = (choice: any) => {
    if (choice.disabledReason && isChoiceDisabled(choice)) {
      return choice.disabledReason;
    }
    return undefined;
  };

  return (
    <div className="game-screen">
      {/* Header with game info */}
      <div className="game-header">
        <div className="player-info">
          <h3>👤 {state.playerName}</h3>
        </div>
        <Timer />
        <div className="progress-info">
          진행도: {Math.round(state.progress)}%
        </div>
      </div>

      {/* Main content area */}
      <div className="game-content">
        {/* Story display */}
        <div className="story-area">
          <div className={`scene-background scene-background--${currentNode.backgroundType}`}>
            <div className="story-content">
              <h2 className="scene-title">{currentNode.title}</h2>
              <div className="scene-description">
                {formatDescription(currentNode.description)}
              </div>
            </div>
          </div>
        </div>

        {/* Choices area */}
        <div className="choices-area">
          <div className="choices-container">
            {currentNode.choices.map((choice) => (
              <Button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                disabled={isChoiceDisabled(choice)}
                variant={choice.id.includes('danger') ? 'danger' : 'primary'}
                className="choice-button"
                title={getChoiceTooltip(choice)}
              >
                {choice.text}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory sidebar */}
      <Inventory />
    </div>
  );
}