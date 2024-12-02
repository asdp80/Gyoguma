// 마이페이지 컴포넌트
// 사용자 정보 관리, 거래 내역, 리뷰 확인
import React from 'react';

function MyPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">마이페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          {/* 사용자 프로필이 들어갈 자리 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">사용자 프로필 정보가 표시됩니다.</p>
          </div>
        </div>
        <div className="md:col-span-2">
          {/* 주문 내역, 찜 목록 등이 들어갈 자리 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">주문 내역, 찜 목록 등이 표시됩니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;