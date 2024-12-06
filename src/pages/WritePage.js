// src/components/Write/ProductForm.js
import React, { useState } from 'react';
import { API } from '../api';
import { useNavigate } from 'react-router-dom';

const WritePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    description: '',
    price: '',
    locationId: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.product.create(formData);
      if (response.data.isSuccess) {
        alert('상품이 등록되었습니다.');
        navigate('/');
      }
    } catch (error) {
      console.error('상품 등록 실패:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseInt(value) || '' : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <select
        name="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">카테고리 선택</option>
        <option value="1">전공서적</option>
        <option value="2">운동용품</option>
        <option value="3">의약품</option>
      </select>

      <input
        type="text"
        name="title"
        placeholder="상품명"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />

      <textarea
        name="description"
        placeholder="상품 설명"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded h-32"
      />

      <input
        type="number"
        name="price"
        placeholder="가격"
        value={formData.price}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />

      <select
        name="locationId"
        value={formData.locationId}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">거래 장소 선택</option>
        <option value="1">도서관</option>
        <option value="2">학생회관</option>
        <option value="3">정문</option>
      </select>

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        상품 등록
      </button>
    </form>
  );
};

export default WritePage;