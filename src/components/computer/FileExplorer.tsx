import { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import './FileExplorer.css';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  icon: string;
  size?: string;
  modified?: string;
  isHidden?: boolean;
  content?: string;
}

export function FileExplorer() {
  const { hasFlag } = useGame();
  const [currentPath, setCurrentPath] = useState('C:\\Users\\김민수\\Desktop');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const files: FileItem[] = [
    {
      id: 'folder-documents',
      name: '내 문서',
      type: 'folder',
      icon: '📁',
      modified: '2024-01-15',
    },
    {
      id: 'folder-pictures',
      name: '사진',
      type: 'folder',
      icon: '📁',
      modified: '2024-01-10',
    },
    {
      id: 'file-report',
      name: '월간보고서.docx',
      type: 'file',
      icon: '📄',
      size: '2.3 MB',
      modified: '2024-01-20',
    },
    {
      id: 'file-presentation',
      name: 'Q4_발표자료.pptx',
      type: 'file',
      icon: '📊',
      size: '5.1 MB',
      modified: '2024-01-18',
    },
    {
      id: 'file-budget',
      name: '예산계획.xlsx',
      type: 'file',
      icon: '📈',
      size: '890 KB',
      modified: '2024-01-17',
    },
    {
      id: 'file-notes',
      name: '개인메모.txt',
      type: 'file',
      icon: '📝',
      size: '1.2 KB',
      modified: '2024-01-22',
      content: `개인 메모장

할 일:
- 월간 보고서 작성 완료 ✓
- 팀 미팅 준비
- 프로젝트 일정 검토

중요:
- 보안 교육 수강 (마감: 이번 주)
- 비밀번호 변경 필요

기타:
- 딸 생일선물 준비
- 주말 가족여행 계획`,
    },
    {
      id: 'file-password-hint',
      name: '.password_hint.txt',
      type: 'file',
      icon: '🔒',
      size: '156 B',
      modified: '2024-01-15',
      isHidden: !hasFlag('computer_unlocked'),
      content: `비밀번호 힌트

컴퓨터: 아내 생일 (MMDD)
금고: 생년월일 + 입사년도 (축약형)

중요: 이 파일은 삭제할 것`,
    },
  ];

  const visibleFiles = files.filter(file => !file.isHidden);

  const handleFileClick = (fileId: string) => {
    setSelectedFile(selectedFile === fileId ? null : fileId);
  };

  const handleFileDoubleClick = (file: FileItem) => {
    if (file.type === 'folder') {
      setCurrentPath(`${currentPath}\\${file.name}`);
    } else if (file.content) {
      // Show file content in a modal or new window
      alert(`${file.name} 내용:\n\n${file.content}`);
    }
  };

  const selectedFileData = files.find(file => file.id === selectedFile);

  return (
    <div className="file-explorer">
      {/* Toolbar */}
      <div className="explorer-toolbar">
        <div className="toolbar-navigation">
          <button className="nav-button">⬅️</button>
          <button className="nav-button">➡️</button>
          <button className="nav-button">⬆️</button>
        </div>
        <div className="address-bar">
          <input 
            type="text" 
            value={currentPath} 
            onChange={(e) => setCurrentPath(e.target.value)}
            className="address-input"
          />
        </div>
        <div className="toolbar-actions">
          <button className="action-button">🔍 검색</button>
          <button className="action-button">↻ 새로고침</button>
        </div>
      </div>

      {/* Content area */}
      <div className="explorer-content">
        {/* Sidebar */}
        <div className="explorer-sidebar">
          <div className="sidebar-section">
            <h4>즐겨찾기</h4>
            <div className="sidebar-item">📁 바탕화면</div>
            <div className="sidebar-item">📁 다운로드</div>
            <div className="sidebar-item">📁 문서</div>
            <div className="sidebar-item">📁 사진</div>
          </div>
          <div className="sidebar-section">
            <h4>내 PC</h4>
            <div className="sidebar-item">💾 로컬 디스크 (C:)</div>
            <div className="sidebar-item">📀 DVD 드라이브 (D:)</div>
          </div>
        </div>

        {/* File list */}
        <div className="file-list">
          <div className="file-list-header">
            <div className="column-name">이름</div>
            <div className="column-modified">수정한 날짜</div>
            <div className="column-type">형식</div>
            <div className="column-size">크기</div>
          </div>

          <div className="file-items">
            {visibleFiles.map((file) => (
              <div
                key={file.id}
                className={`file-item ${selectedFile === file.id ? 'selected' : ''}`}
                onClick={() => handleFileClick(file.id)}
                onDoubleClick={() => handleFileDoubleClick(file)}
              >
                <div className="file-info">
                  <span className="file-icon">{file.icon}</span>
                  <span className="file-name">{file.name}</span>
                </div>
                <div className="file-modified">{file.modified}</div>
                <div className="file-type">
                  {file.type === 'folder' ? '파일 폴더' : file.name.split('.').pop()?.toUpperCase() + ' 파일'}
                </div>
                <div className="file-size">{file.size || ''}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="explorer-statusbar">
        <div className="status-left">
          {visibleFiles.length}개 항목
        </div>
        {selectedFileData && (
          <div className="status-right">
            {selectedFileData.name} 선택됨
            {selectedFileData.size && ` (${selectedFileData.size})`}
          </div>
        )}
      </div>
    </div>
  );
}