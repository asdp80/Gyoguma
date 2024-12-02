// 로그인/로그아웃 버튼
// src/components/dashboard/AuthButton.js
import React from 'react';
import { Link } from 'react-router-dom';

function AuthButton() {
  return (
    <div className="flex items-center gap-4">
      <Link
        to="/login"
        className="text-gyoguma-dark hover:text-gyoguma"
      >
        로그인
      </Link>
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