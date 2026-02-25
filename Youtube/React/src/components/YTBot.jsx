import { useState, useRef, useEffect } from 'react';
import { getBotResponse } from '../utils/botResponses';

const INITIAL_MSG = { from: 'bot', text: "Hey there! 👋 I'm YT Bot — your intelligent assistant. Ask me about recommendations, watch stats, downloads, playlists, features, and more!" };

export default function YTBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MSG]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages(prev => [...prev, { from: 'user', text }]);
    setTyping(true);
    setTimeout(() => {
      const response = getBotResponse(text);
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: response }]);
    }, 600 + Math.random() * 400);
  };

  return (
    <>
      {/* Floating bubble */}
      <button
        className="ytbot-bubble"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close YT Bot' : 'Open YT Bot'}
        title="YT Bot — AI Assistant"
      >
        🤖
      </button>

      {/* Panel */}
      {open && (
        <div className="ytbot-panel" role="dialog" aria-label="YT Bot chat panel">
          <div className="ytbot-header">
            <span className="ytbot-header-icon">🤖</span>
            YT Bot
            <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 6, background: '#10b981', borderRadius: 6, padding: '1px 6px', color: 'white' }}>Online</span>
            <button className="ytbot-close" onClick={() => setOpen(false)} aria-label="Close bot panel">✕</button>
          </div>

          <div className="ytbot-messages" role="log" aria-live="polite" aria-label="Chat messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.from === 'bot' ? 'bot-msg-bubble' : 'user-msg-bubble'}
              >
                {msg.text}
              </div>
            ))}
            {typing && (
              <div className="typing-indicator" aria-label="YT Bot is typing">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 2 && (
            <div style={{ padding: '0 12px 8px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Recommend me videos', 'My watch stats', 'How to download?', 'Start watch party'].map(q => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  style={{ fontSize: 11, padding: '4px 10px', borderRadius: 100, border: '1px solid var(--border)', background: 'var(--bg-hover)', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.15s' }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="ytbot-input-row">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask me anything..."
              aria-label="Message YT Bot"
            />
            <button className="ytbot-send" onClick={send} aria-label="Send message">➤</button>
          </div>
        </div>
      )}
    </>
  );
}
