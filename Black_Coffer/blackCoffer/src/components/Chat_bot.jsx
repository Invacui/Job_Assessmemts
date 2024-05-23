import { useState, useEffect } from 'react';
import useFetcher from '../hooks/useFetcher';
import '../styles/hero.css';
import * as img from '../assets/assets';
import BotInfo from './BotInfo';
const apiUrl = 'https://chat-bot-green-brands.onrender.com'; // Replace with your backend API URL

const Chat = () => {
  const { fetchMessage, messages } = useFetcher();
  const [inputMessage, setInputMessage] = useState('');
  const [conversationMessages, setConversationMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchConversation = async () => {
      await fetchMessagesForCurrentUser();
    };
    fetchConversation();
  }, []);

  useEffect(() => {
    setConversationMessages(messages);
  }, [messages]);

  const fetchMessagesForCurrentUser = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/fetchconv`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'jwttoken': `${localStorage.getItem('token')}`, // Include JWT token for authorization
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      console.log("Conversations======?", data);
      // Store the fetched username in the component state
      setUsername(data.username);
      // Store the fetched messages in the component state
      setConversationMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleMessageSubmit = async () => {
    await fetchMessage(inputMessage);
    setInputMessage('');
  };

  // Sort messages based on timestamp
  const sortedMessages = conversationMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <div className="App">
      <div className="BotInfo-container">
        <BotInfo />
      </div>
      <div className="Chat-box">
        <div className="chat-window">
          {sortedMessages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="user-name">{message.role === "assistant" ? "assistant" : username}</div>
              <div className="user-img">
                <img src={img.Bot} alt="" />
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleMessageSubmit()}
          />
          <button onClick={handleMessageSubmit}><i className="fa-solid fa-paper-plane"></i></button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
