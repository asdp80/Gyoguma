// websocketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  messages: [],
  alarms : [],
  error: null,
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    websocketStartConnect(state){
      //미들웨어에서 연결
    },
    websocketConnected(state) {
      //연결 성공시 상태 변경
      state.connected = true;
    },
    websocketStartDisconnect(state){
      //미들웨어에서 연결 해제
    },
    websocketDisconnected(state) {
      //연결 해제 성공시 상태 변경
      state.connected = false;
    },
    websocketMessageReceived(state, action) {
      state.messages.push(action.payload);
    },
    websocketSendMessage(state, action){
      //미들웨어에서 처리
    },
    websocketError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  websocketStartConnect,
  websocketConnected,
  websocketStartDisconnect,
  websocketDisconnected,
  websocketMessageReceived,
  websocketError,
  websocketSendMessage
} = websocketSlice.actions;

export default websocketSlice.reducer;
