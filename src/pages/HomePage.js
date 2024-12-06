import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/category/ProductCard';
import { setCurrentCategory, fetchProductsByCategory, setPage } from '../redux/slices/productSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const observer = useRef();
  const {
    categoryProducts,
    currentCategory,
    loading,
    hasMore,
    page,
    totalPages
  } = useSelector(state => state.product);

  const currentProducts = categoryProducts[currentCategory] || [];

  const categories = [
    { id: 'all', name: '전체' },
    { id: '전공서적', name: '전공서적' },
    { id: '운동용품', name: '운동용품' },
    { id: '의약품', name: '의약품' },
    { id: '생필품', name: '생필품' },
    { id: '전자기기', name: '전자기기' }
  ];

  const lastProductElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && page < totalPages) {
        dispatch(setPage(page + 1));
        dispatch(fetchProductsByCategory({ categoryId: currentCategory, page: page + 1 }));
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, page, totalPages, dispatch, currentCategory]);

  const handleCategoryChange = (categoryId) => {
    dispatch(setCurrentCategory(categoryId));
    dispatch(fetchProductsByCategory({ categoryId, page: 1 }));
  };

  useEffect(() => {
    dispatch(fetchProductsByCategory({ categoryId: currentCategory, page: 1 }));
  }, [currentCategory, dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* 카테고리 메뉴 */}
      <div className="mb-8 border-b">
        <div className="flex space-x-4 pb-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full transition-colors
                ${currentCategory === category.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 상품 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product, index) => {
          if (currentProducts.length === index + 1) {
            return (
              <div ref={lastProductElementRef} key={product.id}>
                <ProductCard product={product} />
              </div>
            );
          } else {
            return <ProductCard key={product.id} product={product} />;
          }
        })}
      </div>

      {/* 로딩 표시 */}
      {loading && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* 데이터 없음 표시 */}
      {!loading && currentProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          등록된 상품이 없습니다.
        </div>
      )}

      {/* 맨 위로 스크롤 버튼 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default HomePage;