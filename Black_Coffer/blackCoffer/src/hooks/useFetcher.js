import { useState } from 'react';
const apiUrl = 'https://chat-bot-green-brands.onrender.com';
const useFetcher = () => {
  const [messages, setMessages] = useState([]);
  
  const fetchMessage = async (inputMessage) => {
    if (inputMessage.trim() === '') return;

    try {
      // Add the user's message to the UI
      const newUserMessage = { id: messages.length + 1, role: "user", content: inputMessage };
      const updatedMessages = [...messages, newUserMessage];
      setMessages(updatedMessages);

      // Send message to AI and get response
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer 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`, // Replace YOUR_API_KEY with your actual API key
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "openai/gpt-3.5-turbo",
          "messages": updatedMessages, // Include user's message
        })
      });
      
      const data = await response.json();
      const newAiMessage = { id: updatedMessages.length + 1, role: "assistant", content: data.choices[0].message.content };

      const finalMessages = [...updatedMessages, newAiMessage];
      setMessages(finalMessages);
      await sendMessagesToBackend(finalMessages);

      return { messages: finalMessages };
    } catch (error) {
      console.error("Error:", error);
      return { messages };
    }
  };

  const sendMessagesToBackend = async (conversationMessages) => {
    const token = localStorage.getItem('token');
    try {
      console.log("Sending messages to backend:", conversationMessages);

      const formattedMessages = conversationMessages.map((message, index) => {
        console.log(`Message ${index + 1}:`, message);
        return {
          content: message.content || '',
          role: message.role || ''
        };
      });

      console.log("Formatted messages:", formattedMessages);

      const response = await fetch(`${apiUrl}/auth/storeMessages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "jwttoken": `${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(formattedMessages),
      });

      console.log("Formatted >>>>>> messages:", formattedMessages);

      if (!response.ok) {
        throw new Error("Failed to send messages to backend");
      }

      const data = await response.json();
      console.log("Messages sent to backend:", data);
    } catch (error) {
      console.error("Error sending messages to backend:", error);
    }
  };

  return { fetchMessage, messages };
};

export default useFetcher;
