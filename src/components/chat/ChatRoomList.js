// 채팅방 목록
// 최근 대화 목록, 읽지 않은 메시지 표시
import React, { useEffect, useState } from "react";
import ChatRoomCard from "./ChatRoomCard";
import axios from "axios";

const ChatListPage = () => {
  const [chatRooms, setChatRooms] = useState([{id : 1, name : 'CCCC', lastMessage : 'asdf'}]);

  useEffect(() => {
    // 서버에서 채팅방 목록 가져오기
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get("/api/chat-rooms");
        setChatRooms(response.data);
      } catch (error) {
        console.error("채팅방 목록 가져오기 실패:", error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div className="min-h-screen bg-orange-100 p-4">
      <h1 className="text-xl font-bold mb-4">채팅방 목록</h1>
      <div className="space-y-4">
        {chatRooms.map((room) => (
          <ChatRoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default ChatListPage;
