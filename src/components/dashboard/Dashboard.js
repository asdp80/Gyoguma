//프로필, 채팅, 로그인/로그아웃 버튼을 포함하는 컴포넌트
//src/components/dashboard/Dashboard.js// src/components/dashboard/Dashboard.js
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import UserProfile from "./UserProfile";
import AuthButton from "./AuthButton";
import ChatButton from "./ChatButton";

function Dashboard() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="flex items-center gap-6">
      {isAuthenticated ? (
        <>
          <UserProfile user={user} onLogout={handleLogout} />
          <ChatButton />
        </>
      ) : (
        <AuthButton />
      )}
    </nav>
  );
}

export default Dashboard;