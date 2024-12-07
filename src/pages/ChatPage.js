// 채팅 페이지
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { websocketSendMessage } from '../redux/slices/websocketSlice'
import { fetchChatHistory } from '../redux/slices/websocketActions';
import ChatInput from '../components/chat/ChatInput';
import ChatMessage from '../components/chat/ChatMessage';
import ChatParticipants from '../components/chat/ChatParticipants';
import ChatProduct from '../components/chat/ChatProduct';
import ChatCompleteButton from '../components/chat/ChatCompleteButton';
import Rating from '../components/chat/Rating'
import { useParams } from 'react-router-dom';

function ChatPage() {
  const {roomId} = useParams()
  const dispatch = useDispatch()
  const { isConnected, messages=[] } = useSelector((state) => state.websocket)
  const [product, setProduct] = useState({
    title: "상품명: CMYM 책",
    price: "121,687원",
    image: "https://via.placeholder.com/100",
  })
  const [input, setInput] = useState('')
  const [isBuyerComplete, setIsBuyerComplete] = useState(false)
  const [isSellerComplete, setIsSellerComplete] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)


  const userType = 'buyer'
  /* 상품 정보를 가져온 뒤, 작성자 ID와 비교 -> 동일하다면 'seller', 다르다면 'buyer'로 userType 정의 */
  /* 일단은 구매자로 가정함 */

  /* 웹소켓에 연결, 로그인 완료 되자마자 연결해야 함. 임시로 여기서 연결하겠음. */
  const connectWebSocket = useCallback(() => {
    dispatch({type : 'websocket/connect'})
  },[dispatch])

  useEffect(() => { //마운트시 기존 채팅 가져오기
    connectWebSocket()
    dispatch(fetchChatHistory())

    const fetchChatRoomData = async () => {
      try {
        const response = await axios.get(`/api/chat-room/${roomId}`);
        dispatch(response.data.messages)
        setProduct(response.data.product);
      } catch (error) {
        console.error("채팅방 데이터 가져오기 실패:", error);
      }
    };

    fetchChatRoomData();
    
  },[connectWebSocket, dispatch, roomId])

  const disconnectWebSocket = () => { // 웹소켓 연결 끊기, 세션 종료시 실행해야 함.
    dispatch({type : 'websocket/disconnect'})
  }

  /* 메세지 보내기. 연결되어있을 때만 보냄. */
  const sendMessage = () => {
    if(input.trim() && isConnected) {
      dispatch(websocketSendMessage({type : userType, message : input}))
    }

    setInput('')
  }

  /* 구매자 거래완료 */
  const onBuyerComplete = async () => {
    try {
      // 서버에 거래 완료 상태 전송
      const response = await axios.post("/api/complete", { userType: "buyer" });
      if (response.data.success) {
        setIsBuyerComplete(true);
      }

      // 두 사용자 모두 완료한 경우, 별점 모달 열기
      if (isSellerComplete && !isModalOpen) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("거래 완료 처리 실패:", error);
      // 테스트용으로 거래 완료 설정
      setIsBuyerComplete(true);

      if (isSellerComplete && !isModalOpen) {
        setIsModalOpen(true);
      }
    }
  };

  /* 판매자 거래완료 */
  const onSellerComplete = async () => {
    // 이 부분은 테스트 목적으로 자동으로 판매자가 완료 버튼을 누른 것으로 처리
    setIsSellerComplete(true);
    if (isBuyerComplete) {
      setIsModalOpen(true);
    }
  };

  const onRatingSubmit = async (rating) => {
    try {
      // 서버로 별점 데이터 전송
      await axios.post("/api/rate", {
        userId: "seller123", // 별점 대상 사용자 ID
        rating,
      });

      alert("별점이 성공적으로 제출되었습니다!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("별점 제출 실패:", error);
    }
  };

  return (
    <div className="flex flex-col w-96 h-[600px] mx-auto border border-orange-300 rounded-lg bg-orange-50">
      <ChatParticipants buyerName="판매자" />
      <ChatProduct product={product} />
      <ChatMessage messages={messages} />
      <ChatInput onClick={sendMessage} onChange={(e) => setInput(e.target.value)} />
      <ChatCompleteButton
        isComplete={isBuyerComplete}
        onComplete={onBuyerComplete}
      />
      {isModalOpen && <Rating onSubmit={onRatingSubmit} />}
      {/* 아래는 판매자 테스트용 버튼 */}
      {!isSellerComplete && (
        <button
          onClick={onSellerComplete}
          className="bg-gray-400 text-white py-1 px-4 m-2 rounded-md"
        >
          판매자 거래 완료 테스트 버튼
        </button>
      )}
    </div>
  );
}

export default ChatPage;