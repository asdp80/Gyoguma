import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import CategoryPage from "./pages/CategoryPage";
import ChatMainPage from "./pages/ChatMainPage";
import ChatPage from "./pages/ChatPage";
import ChatroomPage from "./pages/ChatroomPage";
import MyPage from "./pages/MyPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductListPage from "./pages/ProductListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 홈 화면 */}
          <Route index element={<HomePage />} />

          {/* 인증 관련 */}
          <Route path="/auth" element={<AuthPage />} />

          {/* 카테고리 및 상품 관련 */}
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />

          {/* 채팅 관련 라우트들을 계층적으로 구성 */}
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/main" element={<ChatMainPage />} />
          <Route path="/chat/room/:roomId" element={<ChatroomPage />} />

          {/* 마이페이지 */}
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;