import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./components/layout/Layout";

import ScrollToTop from "./components/utils/ScrollToTop";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import CategoryPage from "./pages/CategoryPage";
import ChatMainPage from "./pages/ChatMainPage";
import ChatPage from "./pages/ChatPage";
import MyPage from "./pages/MyPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductListPage from "./pages/ProductListPage";
import WritePage from "./pages/WritePage";
import AuthCallback from './pages/AuthCallback';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 홈 화면 */}
          <Route index element={<HomePage />} />

          {/* 인증 관련 */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/oauth2/callback/google" element={<AuthCallback />} />

          {/* 카테고리 및 상품 관련 */}
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/write" element={<WritePage />} />

          {/* 채팅 관련 라우트들을 계층적으로 구성 */}
          <Route path="/chat" element={<ChatMainPage />} />
          <Route path="/chat/:roomId" element={<ChatPage />} />

          {/* 마이페이지 */}
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;