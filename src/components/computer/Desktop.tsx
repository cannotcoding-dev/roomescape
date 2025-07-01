import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { LoginScreen } from './LoginScreen';
import { EmailClient } from './EmailClient';
import { FileExplorer } from './FileExplorer';
import { Notepad } from './Notepad';
import { WindowManager } from './WindowManager';
import './Desktop.css';

interface DesktopWindow {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export function Desktop() {
  const { hasFlag, changeScene } = useGame();
  const [windows, setWindows] = useState<DesktopWindow[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);

  // Check if computer is unlocked
  const isLoggedIn = hasFlag('computer_unlocked');

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  const openWindow = (windowType: string) => {
    const existingWindow = windows.find(w => w.id === windowType);
    
    if (existingWindow) {
      // Bring to front if already open
      setWindows(windows.map(w => 
        w.id === windowType 
          ? { ...w, isMinimized: false, zIndex: nextZIndex }
          : w
      ));
      setNextZIndex(nextZIndex + 1);
      return;
    }

    // Create new window
    const windowConfigs = {
      email: {
        title: '📧 Outlook - 김민수',
        component: EmailClient,
        size: { width: 800, height: 600 },
      },
      files: {
        title: '📁 파일 탐색기',
        component: FileExplorer,
        size: { width: 700, height: 500 },
      },
      notepad: {
        title: '📝 메모장',
        component: Notepad,
        size: { width: 600, height: 400 },
      },
    };

    const config = windowConfigs[windowType as keyof typeof windowConfigs];
    if (!config) return;

    const newWindow: DesktopWindow = {
      id: windowType,
      title: config.title,
      component: config.component,
      isOpen: true,
      isMinimized: false,
      position: { 
        x: 50 + windows.length * 30, 
        y: 50 + windows.length * 30 
      },
      size: config.size,
      zIndex: nextZIndex,
    };

    setWindows([...windows, newWindow]);
    setNextZIndex(nextZIndex + 1);
  };

  const closeWindow = (windowId: string) => {
    setWindows(windows.filter(w => w.id !== windowId));
  };

  const minimizeWindow = (windowId: string) => {
    setWindows(windows.map(w => 
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
  };

  const updateWindow = (windowId: string, updates: Partial<DesktopWindow>) => {
    setWindows(windows.map(w => 
      w.id === windowId ? { ...w, ...updates } : w
    ));
  };

  const hasNewEmail = hasFlag('email_clue_found') === false;

  return (
    <div className="desktop">
      {/* Exit button */}
      <button 
        className="desktop-exit-button"
        onClick={() => changeScene('desk-area')}
        title="컴퓨터 종료하고 책상으로 돌아가기"
      >
        ← 책상으로 돌아가기
      </button>

      {/* Desktop wallpaper */}
      <div className="desktop-wallpaper">
        <div className="desktop-gradient"></div>
      </div>

      {/* Desktop icons */}
      <div className="desktop-icons">
        <div 
          className="desktop-icon"
          onClick={() => openWindow('email')}
          title="Outlook"
        >
          <div className="icon-image">📧</div>
          {hasNewEmail && <div className="notification-badge">!</div>}
          <div className="icon-label">Outlook</div>
        </div>
        
        <div 
          className="desktop-icon"
          onClick={() => openWindow('files')}
          title="파일 탐색기"
        >
          <div className="icon-image">📁</div>
          <div className="icon-label">내 문서</div>
        </div>

        <div 
          className="desktop-icon"
          onClick={() => openWindow('notepad')}
          title="메모장"
        >
          <div className="icon-image">📝</div>
          <div className="icon-label">메모장</div>
        </div>

        <div className="desktop-icon disabled" title="Internet Explorer">
          <div className="icon-image">🌐</div>
          <div className="icon-label">Internet Explorer</div>
        </div>

        <div className="desktop-icon disabled" title="내 컴퓨터">
          <div className="icon-image">💻</div>
          <div className="icon-label">내 컴퓨터</div>
        </div>

        <div className="desktop-icon disabled" title="휴지통">
          <div className="icon-image">♻️</div>
          <div className="icon-label">휴지통</div>
        </div>
      </div>

      {/* Window Manager */}
      <WindowManager
        windows={windows.filter(w => !w.isMinimized)}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onUpdate={updateWindow}
        onFocus={(windowId) => {
          setWindows(windows.map(w => 
            w.id === windowId ? { ...w, zIndex: nextZIndex } : w
          ));
          setNextZIndex(nextZIndex + 1);
        }}
      />

      {/* Taskbar */}
      <div className="taskbar">
        <div className="start-menu">
          <div className="start-button">
            <span className="windows-logo">⊞</span>
            시작
          </div>
        </div>

        <div className="taskbar-apps">
          {windows.map(window => (
            <div
              key={window.id}
              className={`taskbar-item ${window.isMinimized ? 'minimized' : 'active'}`}
              onClick={() => {
                if (window.isMinimized) {
                  updateWindow(window.id, { isMinimized: false, zIndex: nextZIndex });
                  setNextZIndex(nextZIndex + 1);
                }
              }}
            >
              {window.title}
            </div>
          ))}
        </div>

        <div className="system-tray">
          <div className="tray-icons">
            <span title="음량">🔊</span>
            <span title="네트워크">📶</span>
            <span title="배터리">🔋</span>
          </div>
          <div className="clock">
            {new Date().toLocaleTimeString('ko-KR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
}