// src/components/auth/GoogleLoginButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { API } from '../../api';
import { googleLogin } from '../../redux/slices/authSlice';

const GoogleLoginButton = () => {
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try {
      // Google 인증 URL 가져오기
      const response = await API.auth.getGoogleAuthUrl();
      if (response.data?.result?.authUrl) {
        window.location.href = response.data.result.authUrl;
      }
    } catch (error) {
      console.error('Failed to get Google auth URL:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex justify-center items-center gap-2 bg-white text-gray-700 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50"
    >
      <img
        src="/google-icon.png"
        alt="Google"
        className="w-5 h-5"
      />
      Google로 로그인
    </button>
  );
};

export default GoogleLoginButton;
