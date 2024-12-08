// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import websocketReducer from './slices/websocketSlice'
import tradeReducer from './slices/tradeSlice';
import reviewReducer from './slices/reviewSlice';
import uiReducer from './slices/uiSlice';
import { createWebSocketMiddleware } from './slices/websocketMiddleware';

const websocketMiddleware = createWebSocketMiddleware('wss://echo.websocket.org');

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // 인증 정보만 로컬 스토리지에 저장
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    product: productReducer,
    trade: tradeReducer,
    review: reviewReducer,
    ui: uiReducer,
    websocket: websocketReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // redux-persist를 위한 설정
    }).concat(websocketMiddleware)
});

export const persistor = persistStore(store);