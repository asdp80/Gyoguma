import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById } from '../redux/slices/productSlice';

function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

// 셀렉터 분리
  const currentProduct = useSelector(state => state.product.currentProduct);
  const loading = useSelector(state => state.product.loading);
  const error = useSelector(state => state.product.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">로딩중...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">에러: {error}</div>;
  }

  if (!currentProduct) {
    return <div className="flex justify-center items-center h-screen">상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 왼쪽 영역: 이미지 섹션 */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src={currentProduct.imageUrl || `https://via.placeholder.com/400x400`}
              alt={currentProduct.title}
              className="w-full aspect-square object-cover rounded-lg"
            />
          </div>
        </div>

        {/* 오른쪽 영역: 상품 정보 섹션 */}
        <div className="space-y-6">
          {/* 기본 정보 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">{currentProduct.title}</h1>
              <div className="text-xl font-semibold">{currentProduct.price?.toLocaleString()}원</div>
              <div className="text-gray-600">
                <p>판매자: {currentProduct.name}</p>
                <p>학번: {currentProduct.studentId}</p>
                <p>카테고리: {currentProduct.category}</p>
              </div>
            </div>
          </div>

          {/* 구매 옵션 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>수량</span>
                <select className="border rounded px-2 py-1">
                  {[1,2,3,4,5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">배송비 무료 • 직거래</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  구매하기
                </button>
                <button className="flex-1 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
                  채팅하기
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
            <button className="px-6 py-3 border-b-2 border-green-600 font-semibold">
              상품정보
            </button>
            <button className="px-6 py-3">리뷰</button>
            <button className="px-6 py-3">문의</button>
          </div>
        </div>
        <div className="p-6">
          <div className="min-h-[400px] whitespace-pre-wrap">
            {currentProduct.description || "상품 설명이 없습니다."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;