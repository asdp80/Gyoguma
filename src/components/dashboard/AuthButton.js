// src/components/dashboard/AuthButton.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

function AuthButton() {
  const navigate = useNavigate();

  // URL의 토큰 파라미터 체크
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && refreshToken) {
      // 토큰 저장
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      // URL 파라미터 제거
      window.history.replaceState({}, document.title, window.location.pathname);

      // 홈으로 리다이렉트 (또는 원하는 페이지로)
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/logout');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // 로그인 상태 확인
  const isAuthenticated = !!localStorage.getItem('access_token');

  return (
    <div className="flex items-center gap-4">
      {!isAuthenticated ? (
        <>
          <button
            onClick={handleLogin}
            className="text-gyoguma-dark hover:text-gyoguma"
          >
            로그인
          </button>
          <Link
            to="/register"
            className="px-4 py-2 bg-gyoguma text-white rounded-lg hover:bg-gyoguma-dark"
          >
            회원가입
          </Link>
        </>
      ) : (
        <button
          onClick={handleLogout}
          className="text-gyoguma-dark hover:text-gyoguma"
        >
          로그아웃
        </button>
      )}
    </div>
  );
}

export default AuthButton;