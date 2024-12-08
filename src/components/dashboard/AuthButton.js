// src/components/dashboard/AuthButton.js
import React from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

function AuthButton() {
  const handleLogin = async () => {
    try {
      // OAuth2 인증 시작을 위한 URL 얻기
      const response = await axiosInstance.get('/oauth2/authorization/google');

      // 받은 URL로 리다이렉트
      if (response.data?.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      } else {
        // 또는 직접 OAuth2 URL로 이동
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
      }
    } catch (error) {
      console.error('Login failed:', error);
      // 에러 발생시 직접 OAuth2 URL로 이동 시도
      window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    }
  };

  return (
    <div className="flex items-center gap-4">
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
    </div>
  );
}

export default AuthButton;