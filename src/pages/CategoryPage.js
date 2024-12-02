import React from 'react';

function CategoryPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">카테고리</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 카테고리 목록이 들어갈 자리 */}
        <p className="text-gray-600">
          교구 카테고리 목록이 이곳에 표시될 예정입니다.
        </p>
      </div>
    </div>
  );
}

export default CategoryPage;