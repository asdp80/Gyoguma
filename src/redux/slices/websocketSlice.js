// src/redux/websocketSlice.js
import { createSlice } from '@reduxjs/toolkit';

const websocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    isConnected: false,
    messages: [], // message 타입 필요? -> 상대방의 챗과 나의 챗을 구별해야 함.
    // 예시 : {type : 'buyer', message : '대화 가능할까요?'}
  },
  reducers: {
    websocketConnected(state) {
      state.isConnected = true;
    },
    websocketDisconnected(state) {
      state.isConnected = false;
    },
    websocketMessageReceived(state, action) {
      state.messages.push(action.payload);
    },
    websocketSendMessage(state, action) {
      // 메세지 전송은 미들웨어에서 다룸
    },
    chatHistoryFetched(state, action) {
      state.messages = Array.isArray(action.payload) ? action.payload : [{type : 'buyer', message : 'none'}, {type : 'seller', message : 'dddd'}];
    },
  },
});

export const {
  websocketConnected,
  websocketDisconnected,
  websocketMessageReceived,
  websocketSendMessage,
  chatHistoryFetched,
} = websocketSlice.actions;

export default websocketSlice.reducer;
