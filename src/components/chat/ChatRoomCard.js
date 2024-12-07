// 채팅방 컴포넌트
// 메시지 입력창, 이미지 전송?
// 거래 완료 버튼 포함(클릭시 Rating 컴포넌트 표시)
import React from "react";
import { Link } from "react-router-dom";

const ChatRoomCard = ({ room }) => {
  return (
    <Link
      to={`/chat/${room.id}`}
      className="block p-4 bg-white shadow-md rounded-md hover:bg-orange-50 transition"
    >
      <div className="flex items-center">
        <img
          src={room.avatar}
          alt={`${room.name} Avatar`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-bold">{room.name}</h3>
          <p className="text-sm text-gray-600 truncate">{room.lastMessage}</p>
        </div>
      </div>
      <p className="text-sm text-gray-400 text-right mt-2">{room.lastActive}</p>
    </Link>
  );
};

export default ChatRoomCard;
