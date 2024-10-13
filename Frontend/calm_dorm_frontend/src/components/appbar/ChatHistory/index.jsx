import React from "react";
import ReactMarkdown from "react-markdown";
import "./chat.css";  

const ChatHistory = ({ chatHistory }) => {
  return (
    <>
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={`chat-message ${message.type === "user" ? "user-message" : "bot-message"}`}
        >
          {message.type === "user" && <span className="username">You:</span>}

          <div>
            <ReactMarkdown>{message.message}</ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatHistory;
