
// CategoryPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/category/ProductCard';

const CategoryPage = () => {
  const { categoryId } = useParams();

  const categories = [
    { id: 'cat1', name: '전자기기' },
    { id: 'cat2', name: '가구' },
    { id: 'cat3', name: '도서' },
    { id: 'cat4', name: '의류' },
    { id: 'cat5', name: '스포츠' },
    { id: 'cat6', name: '기타' }
  ];

  // 예시 상품 데이터
  const products = [...Array(12)].map((_, i) => ({
    id: i,
    title: `상품 ${i+1}`,
    price: 10000 * (i+1),
    name: "판매자",
    studentId: "2023xxxx"
  }));

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* 상단 검색 및 정렬 */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          {categories.map(cat => (
            // eslint-disable-next-line react/jsx-no-undef
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className={`px-4 py-2 rounded-full ${
                categoryId === cat.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="검색"
            className="px-4 py-2 border rounded-md"
          />
          <select className="px-4 py-2 border rounded-md">
            <option>최신순</option>
            <option>가격낮은순</option>
            <option>가격높은순</option>
          </select>
        </div>
      </div>

      {/* 상품 그리드 */}
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;