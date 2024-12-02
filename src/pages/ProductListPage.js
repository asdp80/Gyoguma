// 상품 목록 페이지
// 검색 결과, 카테고리별 상품 목록

// src/pages/ProductDetailPage.js
import React from 'react';

function ProductDetailPage() {
  return (
    <div className="container mx-auto p-6">
      {/* 상품 상세 페이지 컨테이너 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* 왼쪽 영역: 이미지 섹션 */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            {/* 메인 이미지 영역 */}
            <div className="aspect-square bg-gray-100 rounded-lg"></div>
          </div>
          {/* 썸네일 이미지 목록 */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* 오른쪽 영역: 상품 정보 섹션 */}
        <div className="space-y-6">
          {/* 기본 정보 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">상품명</h1>
              <div className="text-xl font-semibold">가격</div>
              <div className="text-gray-600">판매자 정보</div>
            </div>
          </div>

          {/* 구매 옵션 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div>수량 선택</div>
              <div>배송 정보</div>
              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-gyoguma text-white rounded-lg">
                  구매하기
                </button>
                <button className="flex-1 py-3 border border-gyoguma text-gyoguma rounded-lg">
                  장바구니
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 상세 정보 탭 */}
      <div className="mt-12 bg-white rounded-lg shadow-md">
        <div className="border-b">
          <div className="flex">
            <button className="px-6 py-3 border-b-2 border-gyoguma font-semibold">
              상품정보
            </button>
            <button className="px-6 py-3">리뷰</button>
            <button className="px-6 py-3">문의</button>
          </div>
        </div>
        <div className="p-6">
          {/* 상세 정보 컨텐츠 영역 */}
          <div className="min-h-[400px]"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;