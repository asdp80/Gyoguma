// 상품 목록 페이지
// 검색 결과, 카테고리별 상품 목록

import React from 'react';


function ProductListPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">상품 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* 상품 목록이 들어갈 자리 */}
        <p className="text-gray-600">
          상품 카드들이 이곳에 그리드 형태로 표시될 예정입니다.
        </p>
      </div>
    </div>
  );
}

export default ProductListPage;