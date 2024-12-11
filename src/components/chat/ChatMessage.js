// 개별 메시지(텍스트, 이미지 메시지) 컴포넌트
// 시간 표시, 읽음 상태(?)
import React from "react";
// 유저 정보를 가져와야함.

const ChatMessage = ({ messages }) => {
  return (
    <div className="flex flex-col p-4 flex-grow overflow-y-auto bg-orange-50 scrollbar-thin scrollbar-corner-transparent scrollbar-thumb-gray-200 scrollbar-track-transparent">
      {messages?.map((message, index) => (
        <div
          key={index}
          className={`mb-3 p-3 rounded-lg shadow-md ${
            message.senderId === 1 //실제로는 현재 유저 === 상품 작성자
              ? "bg-green-100 self-start"
              : "bg-purple-100 self-end"
          }`}
        >
          <span className="text-sm">{message.message}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatMessage;
