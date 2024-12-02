// 로그인과 회원가입을 담당하는 페이지
// 첫 방문시 로그인 true
// 회원가입 클릭 -> 로그인 false -> SignUpForm 표시

import React from 'react';
import TextArea from '../components/common/TextArea';

function AuthPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">로그인 / 회원가입</h1>
      <div className="space-y-4">
        {/* 인증 폼이 들어갈 자리 */}
        <TextArea />
      </div>
    </div>
  );
}

export default AuthPage;