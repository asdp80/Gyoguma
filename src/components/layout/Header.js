// src/components/layout/Header.js
import { Link } from "react-router-dom";
import UserProfile from "../dashboard/UserProfile"; // UseProfile을 UserProfile로 수정
import AuthButton from "../dashboard/AuthButton";
import InputField from "../common/InputField";
import { useCallback, useState } from "react";

function Header() {
  const [searchText, setSearchText] = useState('')
  const isLoggedIn = false; // 이후 상태 관리로 변경

  const onSearchChange = useCallback(e => {setSearchText(e.target.value)},[])

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="교구마" className="h-10" />
            <span className="text-gyoguma-dark font-bold text-xl">교구마</span>
          </Link>

          {/* 검색창 */}
          <div className="flex-1 max-w-2xl mx-8">
            <InputField
            type='text'
            placeholder='검색'
            value={searchText}
            onChange={onSearchChange}/>
          </div>
          {/* !!!!중요 : onChange를 반드시 지정할 것!!!! */}

          {/* 네비게이션 */}
          <nav className="flex items-center gap-6">
            <Link to="/category" className="text-gyoguma-dark hover:text-gyoguma">
              카테고리
            </Link>
            {isLoggedIn ? (
              <>
                <UserProfile />
                <Link to="/chat/main" className="text-gyoguma-dark hover:text-gyoguma">
                  채팅
                </Link>
              </>
            ) : (
              <AuthButton />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;