import React, { useState } from 'react';
import './Notepad.css';

export function Notepad() {
  const [content, setContent] = useState(`메모장

발견한 단서들:
- 컴퓨터 비밀번호: 아내 생일 (0315)
- 이메일에서 "평소 장소"라는 단서 발견
- USB가 숨겨진 곳을 찾아야 함

조사해야 할 곳들:
□ 화분 밑
□ 커피머신 근처  
□ 책장 뒤편
□ 프린터 구역

김과장 정보:
- 생년월일: 1985.03.22
- 입사년도: 2018년
- 아내 생일: 3월 15일

중요: 30분 안에 증거를 찾고 탈출해야 함!`);

  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState(true);

  const handleFontSizeChange = (delta: number) => {
    setFontSize(Math.max(8, Math.min(72, fontSize + delta)));
  };

  return (
    <div className="notepad">
      {/* Menu bar */}
      <div className="notepad-menubar">
        <div className="menu-item">파일</div>
        <div className="menu-item">편집</div>
        <div className="menu-item">서식</div>
        <div className="menu-item">보기</div>
        <div className="menu-item">도움말</div>
      </div>

      {/* Toolbar */}
      <div className="notepad-toolbar">
        <div className="toolbar-group">
          <button className="toolbar-button" title="새 파일">📄</button>
          <button className="toolbar-button" title="열기">📁</button>
          <button className="toolbar-button" title="저장">💾</button>
        </div>
        
        <div className="toolbar-separator"></div>
        
        <div className="toolbar-group">
          <button className="toolbar-button" title="실행 취소">↶</button>
          <button className="toolbar-button" title="다시 실행">↷</button>
        </div>
        
        <div className="toolbar-separator"></div>
        
        <div className="toolbar-group">
          <button 
            className="toolbar-button" 
            onClick={() => handleFontSizeChange(-2)}
            title="글꼴 크기 줄이기"
          >
            🔤-
          </button>
          <span className="font-size-display">{fontSize}px</span>
          <button 
            className="toolbar-button" 
            onClick={() => handleFontSizeChange(2)}
            title="글꼴 크기 늘리기"
          >
            🔤+
          </button>
        </div>
        
        <div className="toolbar-separator"></div>
        
        <div className="toolbar-group">
          <button
            className={`toolbar-button ${wordWrap ? 'active' : ''}`}
            onClick={() => setWordWrap(!wordWrap)}
            title="자동 줄 바꿈"
          >
            📝
          </button>
        </div>
      </div>

      {/* Editor area */}
      <div className="notepad-editor">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="notepad-textarea"
          style={{
            fontSize: `${fontSize}px`,
            whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
          }}
          placeholder="여기에 텍스트를 입력하세요..."
          spellCheck={false}
        />
      </div>

      {/* Status bar */}
      <div className="notepad-statusbar">
        <div className="status-left">
          행 {content.split('\n').length}, 열 1
        </div>
        <div className="status-center">
          글자 수: {content.length}
        </div>
        <div className="status-right">
          Windows (CRLF) | UTF-8
        </div>
      </div>
    </div>
  );
}