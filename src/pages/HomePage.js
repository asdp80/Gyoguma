// 메인 페이지
// 카테고리 바로가기, 상품 선택
// src/pages/HomePage.js
import React from "react";

// src/pages/HomePage.js
function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">
        교구마에 오신 것을 환영합니다
      </h1>

      {/* 테스트를 위한 간단한 컨텐츠 */}
      <div className="mt-8 p-4 bg-gyoguma-light rounded-lg">
        <p className="text-center">
          홈페이지가 정상적으로 렌더링되고 있습니다.
        </p>
      </div>
    </div>
  );
}

export default HomePage;