// 사용자 프로필
// 프로필 정보, 판매/구매 내역, 내상품 보기(내상품 페이지로 이둥), 학점
// src/components/dashboard/UserProfile.js
import React from 'react';

function UserProfile() {
  return (
    <div className="relative">
      <button className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-200">
          {/* 프로필 이미지가 들어갈 자리 */}
        </div>
        <span className="text-gray-700">사용자명</span>
      </button>
    </div>
  );
}

export default UserProfile;