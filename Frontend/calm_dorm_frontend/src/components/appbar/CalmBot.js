import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./CalmBot.css"; // Ensure you have your CSS styles in this file
import ChatHistory from "./ChatHistory";
import Loading from "./Loading";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false); // State to toggle chat visibility

  // Initialize your Gemini API
  console.log(process.env.REACT_APP_API_KEY)
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Define your project context
  const projectContext = `
    Your name is CalmBot.You are a chatbot for a project called 'CalmDorm', which is a stress-buster platform.
    It features a dynamic calendar for scheduling tasks such as one-on-one coaching,
    multiplayer gaming, and a novel/story discussion panel, a day for yourself, group therapy sessions and journal writing sessions. The multiplayer gaming section is the only page that has been developed it has a tic tac toe game. Apart from that users can also login/signup. And ask any questions to our assistant CalmBot.
  `;

  // Function to handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Function to send user message to Gemini
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      // Combine user input with project context
      const inputWithContext = `${projectContext}\nUser: ${userInput}\nBot:`;
      
      // Call Gemini API to get a response
      const result = await model.generateContent(inputWithContext);
      const response = result.response; // Assuming response has the generated text

      // Add Gemini's response to the chat history
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() }, // Adjust this if necessary
      ]);
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  // Function to clear the chat history
  const clearChat = () => {
    setChatHistory([]);
  };

  // Function to toggle chat visibility
  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div className="container">
      {/* Chat icon */}
      <div className="chat-icon" onClick={toggleChat}>
        💬
      </div>

      {/* Chat window */}
      {isChatVisible && (
        <div className="chat-window">
          <h1 className="title">CalmBot</h1>

          <div className="chat-container">
            <ChatHistory chatHistory={chatHistory} />
            <Loading isLoading={isLoading} />
          </div>

          <div className="input-container">
            <input
              type="text"
              className="input-box"
              placeholder="Type your message..."
              value={userInput}
              onChange={handleUserInput}
            />
            <button
              className="send-button"
              onClick={sendMessage}
              disabled={isLoading}
            >
              Send
            </button>
          </div>

          <button className="clear-button" onClick={clearChat}>
            Clear Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
