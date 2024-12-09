// 채팅 페이지
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  websocketStartConnect,
  websocketStartDisconnect,
  websocketSendMessage,
  websocketMessageReceived
} from '../redux/slices/websocketSlice'
import ChatInput from '../components/chat/ChatInput';
import ChatMessage from '../components/chat/ChatMessage';
import ChatParticipants from '../components/chat/ChatParticipants';
import ChatProduct from '../components/chat/ChatProduct'
import ChatCompleteButton from '../components/chat/ChatCompleteButton';
import { useParams } from 'react-router-dom';

function ChatPage() {
  const dispatch = useDispatch()
  const { connected, messages=[] } = useSelector((state) => state.websocket)
  const [input, setInput] = useState('')
  const [complete, setComplete] = useState(false)
  const params = useParams()

  

  const userType = 'buyer'
  /* 상품 정보를 가져온 뒤, 작성자 ID와 비교 -> 동일하다면 'seller', 다르다면 'buyer'로 userType 정의 */
  /* 일단은 구매자로 가정함 */

  /* 웹소켓에 연결, 로그인 완료 되자마자 연결해야 함. 임시로 여기서 연결하겠음. */
  const connectWebSocket = useCallback(() => {
    if (!connected) { // 이미 연결되어 있다면 재연결하지 않음
      dispatch(websocketStartConnect());
    }
  },[dispatch, connected])

  const disconnectWebSocket = useCallback(() => { // 웹소켓 연결 끊기, 세션 종료시 실행해야 함.
    dispatch(websocketStartDisconnect())
  },[dispatch])

  const fetchChatData = useCallback(async () => {
    try{
      const response = await axios.get(`/api/chat/${params.roomId}`)
      // 여기서 채팅 정보를 가져와 기본적인 정보를 초기화합니다
      const chatData = response.data.messages

      // 유저 정보를 초기화합니다.

      // 기존의 메세지들을 표시합니다
      chatData.array.forEach(message => {
        dispatch(websocketMessageReceived(message))
      });
    } catch (e) {
      console.log('Fetching chatData failed : ',e)
    }
    
  },[params.roomId, dispatch])
  
  useEffect(() => { //마운트시 기존 채팅 가져오기
    connectWebSocket()
    fetchChatData()
    //return () => {disconnectWebSocket()}
  },[connectWebSocket, fetchChatData])

  

  /* 메세지 보내기. 연결되어있을 때만 보냄. */
  const sendMessage = () => {
    if(input.trim() && connected) {
      dispatch(websocketSendMessage({sender : userType, message : input}))
    }

    setInput('')
  }

  return (
    <div className="flex flex-col w-96 h-[724px] mx-auto border border-orange-300 rounded-lg bg-orange-50">
      <ChatParticipants buyerName={'상대방'} />
      <ChatProduct product={{title : 'title', price : '3020'}} />
      <ChatMessage messages={messages} />
      <ChatInput onClick={sendMessage} value={input} onChange={(e) => setInput(e.target.value)} />
      <ChatCompleteButton Complete={complete} setComplete={setComplete} />
    </div>
  );
}

export default ChatPage;