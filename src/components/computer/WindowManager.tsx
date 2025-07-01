import React from 'react';
import './WindowManager.css';

interface WindowData {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

interface WindowManagerProps {
  windows: WindowData[];
  onClose: (windowId: string) => void;
  onMinimize: (windowId: string) => void;
  onUpdate: (windowId: string, updates: Partial<WindowData>) => void;
  onFocus: (windowId: string) => void;
}

export function WindowManager({ 
  windows, 
  onClose, 
  onMinimize, 
  onUpdate, 
  onFocus 
}: WindowManagerProps) {
  return (
    <>
      {windows.map((window) => (
        <WindowFrame
          key={window.id}
          window={window}
          onClose={() => onClose(window.id)}
          onMinimize={() => onMinimize(window.id)}
          onUpdate={(updates) => onUpdate(window.id, updates)}
          onFocus={() => onFocus(window.id)}
        />
      ))}
    </>
  );
}

interface WindowFrameProps {
  window: WindowData;
  onClose: () => void;
  onMinimize: () => void;
  onUpdate: (updates: Partial<WindowData>) => void;
  onFocus: () => void;
}

function WindowFrame({ window, onClose, onMinimize, onUpdate, onFocus }: WindowFrameProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button
    
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y,
    });
  };

  React.useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, globalThis.innerWidth - window.size.width));
      const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, globalThis.innerHeight - window.size.height));
      
      onUpdate({
        position: { x: newX, y: newY }
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onUpdate, window.size]);

  const Component = window.component;

  return (
    <div
      className="window-frame"
      style={{
        position: 'absolute',
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex,
      }}
      onClick={onFocus}
    >
      {/* Window title bar */}
      <div 
        className="window-titlebar"
        onMouseDown={handleMouseDown}
      >
        <div className="window-title">{window.title}</div>
        <div className="window-controls">
          <button
            className="window-control minimize"
            onClick={onMinimize}
            title="최소화"
          >
            ➖
          </button>
          <button
            className="window-control maximize disabled"
            title="최대화"
          >
            ⬜
          </button>
          <button
            className="window-control close"
            onClick={onClose}
            title="닫기"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window content */}
      <div className="window-content">
        <Component />
      </div>
    </div>
  );
}