import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import './EmailClient.css';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  content: string;
  time: string;
  isRead: boolean;
  isImportant?: boolean;
  isSecret?: boolean;
}

export function EmailClient() {
  const { setFlag, hasFlag } = useGame();
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const emails: Email[] = [
    {
      id: 'secret-email',
      from: 'unknown@secretmail.com',
      subject: '내일 밤 계획',
      preview: '김 과장님, 내일 밤 9시 30분 이후에...',
      content: `김 과장님,

내일 밤 9시 30분 이후에 '물건'을 평소 장소에 놓아두세요.
절대 다른 사람이 보면 안 됩니다.
확인 후 연락드리겠습니다.

- K

P.S. 프로젝트가 성공하면 약속한 대로 보상을 해드리겠습니다.`,
      time: '어제 오후 11:42',
      isRead: false,
      isSecret: true,
      isImportant: true,
    },
    {
      id: 'work-email-1',
      from: 'hr@company.com',
      subject: '월례 회의 안내',
      preview: '다음 주 월요일 오전 10시에 월례 회의가...',
      content: `안녕하세요, 김민수님

다음 주 월요일 오전 10시에 월례 회의가 있습니다.
회의실 A에서 진행되며, 준비사항은 다음과 같습니다:

1. 월간 보고서 준비
2. 프로젝트 진행 현황 정리
3. 다음 월 계획 수립

참석 필수입니다.

감사합니다.
인사팀 드림`,
      time: '3일 전',
      isRead: true,
    },
    {
      id: 'work-email-2',
      from: 'security@company.com',
      subject: '보안 정책 업데이트',
      preview: '회사 보안 정책이 업데이트되었습니다...',
      content: `보안 정책 업데이트 안내

최근 보안 위협이 증가함에 따라 다음과 같이 정책을 강화합니다:

1. 비밀번호는 분기별로 변경
2. 외부 저장매체 사용 시 승인 필요
3. 기밀 문서는 암호화하여 보관
4. 수상한 이메일 발견 시 즉시 신고

위반 시 징계 조치될 수 있습니다.

보안팀`,
      time: '1주일 전',
      isRead: true,
    },
    {
      id: 'personal-email',
      from: 'wife@gmail.com',
      subject: '오늘 저녁 약속',
      preview: '여보, 오늘 저녁에 딸 생일파티 준비...',
      content: `여보,

오늘 저녁에 딸 생일파티 준비하려고 해요.
케이크는 제가 주문했고, 선물은 어떻게 할까요?

늦지 말고 일찍 들어와 주세요.

사랑해요 ❤️
아내가`,
      time: '오늘 오후 2:15',
      isRead: false,
    },
  ];

  const handleEmailClick = (emailId: string) => {
    setSelectedEmail(emailId);
    
    // Mark secret email as read and set flag
    if (emailId === 'secret-email' && !hasFlag('email_clue_found')) {
      setFlag('email_clue_found', true);
    }
  };

  const selectedEmailData = emails.find(email => email.id === selectedEmail);
  const unreadCount = emails.filter(email => !email.isRead).length;

  return (
    <div className="email-client">
      {/* Email toolbar */}
      <div className="email-toolbar">
        <div className="toolbar-left">
          <button className="toolbar-button">📧 새 메일</button>
          <button className="toolbar-button">📥 받은편지함</button>
          <button className="toolbar-button">📤 보낸편지함</button>
        </div>
        <div className="toolbar-right">
          <button className="toolbar-button">🔍 검색</button>
          <button className="toolbar-button">⚙️ 설정</button>
        </div>
      </div>

      <div className="email-content">
        {/* Email sidebar */}
        <div className="email-sidebar">
          <div className="folder-list">
            <div className="folder-item active">
              📥 받은편지함 ({unreadCount})
            </div>
            <div className="folder-item">📤 보낸편지함</div>
            <div className="folder-item">📋 임시보관함</div>
            <div className="folder-item">🗑️ 휴지통</div>
            <div className="folder-item">📌 중요</div>
          </div>
        </div>

        {/* Email list */}
        <div className="email-list">
          <div className="email-list-header">
            <h3>받은편지함</h3>
            <div className="list-controls">
              <button className="control-button">↻ 새로고침</button>
              <button className="control-button">🗑️ 삭제</button>
            </div>
          </div>

          <div className="emails">
            {emails.map((email) => (
              <div
                key={email.id}
                className={`email-item ${
                  selectedEmail === email.id ? 'selected' : ''
                } ${!email.isRead ? 'unread' : ''} ${
                  email.isSecret ? 'secret' : ''
                }`}
                onClick={() => handleEmailClick(email.id)}
              >
                <div className="email-header">
                  <div className="email-from">
                    {email.isImportant && (
                      <span className="importance-mark">❗</span>
                    )}
                    {email.isSecret && (
                      <span className="secret-mark">🔒</span>
                    )}
                    {email.from}
                  </div>
                  <div className="email-time">{email.time}</div>
                </div>
                <div className="email-subject">{email.subject}</div>
                <div className="email-preview">{email.preview}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Email preview */}
        <div className="email-preview">
          {selectedEmailData ? (
            <>
              <div className="preview-header">
                <div className="preview-subject">
                  {selectedEmailData.isSecret && (
                    <span className="secret-badge">🔒 기밀</span>
                  )}
                  {selectedEmailData.subject}
                </div>
                <div className="preview-meta">
                  <div className="preview-from">
                    보낸사람: {selectedEmailData.from}
                  </div>
                  <div className="preview-time">
                    {selectedEmailData.time}
                  </div>
                </div>
              </div>
              
              <div className="preview-content">
                {selectedEmailData.content.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < selectedEmailData.content.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>

              {selectedEmailData.id === 'secret-email' && (
                <div className="email-warning">
                  ⚠️ 이 이메일은 수상한 내용을 포함하고 있습니다. 
                  '평소 장소'가 어디인지 사무실을 수색해보세요.
                </div>
              )}

              <div className="preview-actions">
                <button className="action-button primary">↩️ 답장</button>
                <button className="action-button">↪️ 전달</button>
                <button className="action-button">🗑️ 삭제</button>
                <button className="action-button">📌 중요표시</button>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <div className="no-selection-icon">📧</div>
              <h3>이메일을 선택하세요</h3>
              <p>받은편지함에서 이메일을 클릭하면 내용을 확인할 수 있습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}