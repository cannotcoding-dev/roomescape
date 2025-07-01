import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import './LoginScreen.css';

export function LoginScreen() {
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const { setFlag, hasFlag } = useGame();

  const correctPassword = '0315'; // Wife's birthday from family photo

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      setFlag('computer_unlocked', true);
      setFlag('password_found', true);
    } else {
      setAttempts(attempts + 1);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
      
      if (attempts >= 2) {
        // After 3 failed attempts, give a hint
        setFlag('password_hint_shown', true);
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const showHint = hasFlag('password_hint_shown') && attempts >= 2;

  return (
    <div className="login-screen">
      <div className="login-background">
        <div className="login-overlay"></div>
      </div>
      
      <div className="login-container">
        <div className={`login-box ${isShaking ? 'shake' : ''}`}>
          <div className="user-avatar">
            <div className="avatar-circle">
              <span className="avatar-icon">👤</span>
            </div>
          </div>
          
          <div className="user-info">
            <h2 className="username">김민수</h2>
            <p className="user-status">로그인이 필요합니다</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="password-input-container">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="암호"
                className="password-input"
                maxLength={10}
                autoFocus
              />
              <button type="submit" className="login-button" disabled={!password}>
                →
              </button>
            </div>
            
            {attempts > 0 && (
              <div className="error-message">
                잘못된 암호입니다. ({attempts}/3회 시도)
              </div>
            )}
            
            {showHint && (
              <div className="hint-box">
                💡 힌트: 책상 위 가족사진을 확인해보세요.<br/>
                아내의 생일이 중요할 수 있습니다. (MMDD 형식)
              </div>
            )}
          </form>

          <div className="login-options">
            <button className="option-button disabled" disabled>
              PIN 사용
            </button>
            <button className="option-button disabled" disabled>
              암호 재설정
            </button>
          </div>
        </div>

        <div className="login-footer">
          <div className="system-info">
            <div className="network-status">
              📶 회사 네트워크 연결됨
            </div>
            <div className="power-options">
              <button className="power-button" title="전원">⏻</button>
              <button className="restart-button" title="다시 시작">🔄</button>
            </div>
          </div>
        </div>
      </div>

      {/* Background particles for visual effect */}
      <div className="background-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}