import { useState } from 'react'
import './App.css'

function App() {
  const [nickname, setNickname] = useState('')
  const [gameStarted, setGameStarted] = useState(false)

  const handleStart = () => {
    if (nickname.trim()) {
      setGameStarted(true)
    }
  }

  if (!gameStarted) {
    return (
      <div className="app">
        <div className="start-screen">
          <div className="title-container">
            <h1>🏢 RoomEscape</h1>
            <h2>The Night Shift Mystery</h2>
            <p className="subtitle">
              야근 중 동료의 숨겨진 비밀을 파헤치는 몰입형 방탈출 게임
            </p>
          </div>
          
          <div className="intro-story">
            <p>
              당신은 IT 회사에서 일하는 직장인입니다.<br/>
              최근 동료 '김과장'의 행동이 이상했습니다...
            </p>
            <ul>
              <li>야근을 자주 하지만 실제 업무는 보이지 않음</li>
              <li>컴퓨터 화면을 남들이 보지 못하게 숨김</li>
              <li>이상한 전화 통화를 자주 함</li>
              <li>금고에 뭔가를 숨겨놓는 것을 목격</li>
            </ul>
            <p>
              오늘, 김과장이 급하게 나간 사이 그의 비밀을 파헤칠 기회가 생겼습니다.<br/>
              <strong>30분 후</strong> 김과장이 돌아올 예정이니, 그 전에 증거를 찾고 사무실을 빠져나가야 합니다.
            </p>
          </div>

          <div className="nickname-input">
            <label htmlFor="nickname">야근 중인 당신의 이름을 입력하세요:</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
              onKeyPress={(e) => e.key === 'Enter' && handleStart()}
              maxLength={20}
            />
            <button onClick={handleStart} disabled={!nickname.trim()}>
              게임 시작
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="game-screen">
        <h1>안녕하세요, {nickname}님!</h1>
        <p>게임이 곧 시작됩니다...</p>
      </div>
    </div>
  )
}

export default App