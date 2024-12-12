// 채팅방 목록
// 최근 대화 목록, 읽지 않은 메시지 표시
import React, { useEffect, useState, useRef } from "react";
import ChatRoomCard from "./ChatRoomCard";
import { API } from "../../api/index";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const ChatListPage = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const {userId} = useParams()
  const {userEmail, isAuthenticated} = useSelector((state) => state.auth)

  useEffect(() => {
    if(!isAuthenticated) {
      alert('로그인이 필요한 서비스입니다.')
      Navigate(-1)
    }
    // 서버에서 채팅방 목록 가져오기
    const fetchChatRooms = async () => {
      try {
        console.log('Fetch Chats')
        const response = await API.chat.getUserRooms(userId); // 이걸 이메일로 가져오거나 다른 방법을 강구해야함.
        setChatRooms(response.data);
      } catch (error) {
        console.error("채팅방 목록 가져오기 실패:", error);
      }
    };
    fetchChatRooms();
  }, [userId, isAuthenticated]);

  return (
    <div className="min-h-screen bg-orange-100 p-4">
      <h1 className="text-xl font-bold mb-4">채팅방 목록</h1>
      <div className="space-y-4">
        {chatRooms.map((room) => {
          console.log(room)
          return (<ChatRoomCard key={room.roomId} room={room} />)
        })}
      </div>
    </div>
  );
};

export default ChatListPage;
