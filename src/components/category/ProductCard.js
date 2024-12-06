// src/components/category/ProductCard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  if (!product) return null;
// 임시 이미지 URL 수정
  const placeholderImage = `https://via.placeholder.com/200x150`;

  return (
    <div onClick={() => navigate(`/products/${product.id}`)} className="...">
      <div className="...">
        <img
          src={product.imageUrl || placeholderImage}
          alt={product.title}
          className="..."
        />
        <div className="...">
          <h3 className="...">{product.title}</h3>
          <div className="...">
            <span className="...">{product.nickname}</span>
          </div>
          <p className="...">{product.price?.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);