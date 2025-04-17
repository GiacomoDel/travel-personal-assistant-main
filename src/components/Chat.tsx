'use client';

import React, { useState } from 'react';
import './Chat.css';

interface Message {
  sender: 'user' | 'agent';
  text: string;
}

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    const agentMessage: Message = {
      sender: 'agent',
      text: 'Hola, ¿qué tal?, ¿en qué puedo ayudarte?',
    };

    setMessages((prev) => [...prev, userMessage, agentMessage]);
    setInput('');
  };

  return (
    <div className="chat-container">
      {/* Input */}
      <div className="input-wrapper">
        <input
          className="chat-input"
          type="text"
          placeholder="Haz cualquier pregunta o di qué te gustaría hacer..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="chat-button" onClick={handleSend}>
          Buscar
        </button>
      </div>

      {/* Chat messages */}
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message-wrapper ${
              msg.sender === 'user' ? 'user-message' : 'agent-message'
            }`}
          >
            {msg.sender === 'agent' && (
              <div className="agent-icon">🤖</div>
            )}
            <div className={`msg-bubble ${msg.sender}-bubble`}>
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <div className="user-icon">👤</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
