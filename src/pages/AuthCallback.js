// src/pages/AuthCallback.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { googleLogin } from '../redux/slices/authSlice';
import Loading from '../components/common/Loading';

const AuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      dispatch(googleLogin(code))
        .unwrap()
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error('Google login failed:', error);
          navigate('/login', { state: { errorMessage: 'Google 로그인 실패' } });
        });
    }
  }, [dispatch, navigate, searchParams]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>로그인 처리 중 오류가 발생했습니다: {error}</div>;
  }

  return null;
};

export default AuthCallback;
