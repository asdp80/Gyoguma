// src/redux/websocketActions.js
import { chatHistoryFetched } from './websocketSlice';

export const fetchChatHistory = () => async (dispatch) => {
  try {
    const response = await fetch('CHAT-HISTORY-URI'); // chat history 갖고오기
    const data = await response.json();
    dispatch(chatHistoryFetched(data)); // Redux 상태에 저장
  } catch (error) {
    console.error('Failed to fetch chat history:', error);
    dispatch(chatHistoryFetched())
  }
};
