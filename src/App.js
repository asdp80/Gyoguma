import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WritePage from './pages/WritePage';
import ProductEditPage from './pages/ProductEditPage';
import MyProductsPage from './pages/MyProductsPage';
import ChatMainPage from './pages/ChatMainPage';
import ChatRoomPage from './pages/ChatRoomPage';
import AlarmPage from './pages/AlarmPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* public 라우트 */}
            <Route path="/" element={<HomePage />} /> {/* 메인 페이지 */}
            <Route path="/login" element={<LoginPage />} /> {/* 로그인 */}
            <Route path="/signup" element={<SignupPage />} /> {/* 회원가입 */}
            <Route path="/category" element={<CategoryPage />} /> {/* 카테고리 */}
            <Route path="/category/:productId" element={<ProductDetailPage />} /> {/* 상품 상세 */}

            {/* Protected 라우트 - 로그인 필요 */}
            <Route path="/write" element={<WritePage />} /> {/* 글작성 */}
            <Route path="/edit/:productId" element={<ProductEditPage />} /> {/* 글수정 */}
            <Route path="/products/:userId" element={<MyProductsPage />} /> {/* 내글보기 */}
            <Route path="/chat/main/:userId" element={<ChatMainPage />} /> {/* 채팅-메인 */}
            <Route path="/chat/:chatId" element={<ChatRoomPage />} /> {/* 채팅-1:1 */}
            <Route path="/alarm" element={<AlarmPage />} /> {/* 알림 */}
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;