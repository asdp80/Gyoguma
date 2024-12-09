// src/pages/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: 'test@example.com',
    password: 'test1234',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(login(formData));

      if (login.fulfilled.match(resultAction)) {
        alert('로그인 성공!');
        navigate('/');
      } else {
        alert(`로그인 실패: ${resultAction.payload || '알 수 없는 오류'}`);
      }
    } catch (err) {
      alert('로그인 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8">로그인</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded">
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? '로그인 중...' : '테스트 계정으로 로그인'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
