// 상품 등록/수정 폼
// 이미지 업로드, 카테고리, 위치, 시간 등 선택
import React, { useState } from 'react';
import InputField from '../common/InputField';
import DropDownSelector from '../common/DropDownSelector';

export default function ProductForm() {
  // 상품 정보를 관리하는 상태입니다
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: 0
  });

  // 피드백 정보를 관리하는 상태입니다
  const [feedback, setFeedback] = useState({
    titleLength: 0,
    titleValid: true,
    priceValid: true
  });

  // 입력 필드 값이 변경될 때 호출되는 함수입니다
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 실시간 유효성 검사를 수행합니다
    if (name === 'title') {
      setFeedback(prev => ({
        ...prev,
        titleLength: value.length,
        titleValid: value.length >= 5 && value.length <= 100
      }));
    }

    if (name === 'price') {
      const numberValue = Number(value);
      setFeedback(prev => ({
        ...prev,
        priceValid: numberValue > 0 && numberValue <= 10000000
      }));
    }
  };

  // 폼 작성 진행률을 계산하는 함수입니다
  const calculateProgress = () => {
    let progress = 0;
    if (formData.title) progress += 33;
    if (formData.price) progress += 33;
    if (formData.description) progress += 34;
    return progress;
  };

  const selectItems = [
    {value : '0', text : '전자기기'},
    {value : '1', text : '가구'},
    {value : '2', text : '도서'},
    {value : '3', text : '의류'},
]

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-green-800">상품 등록</h1>
      
      {/* 진행 상태 표시 바 */}
      <div className="mb-8">
        <div className="flex justify-between mb-2 text-sm text-green-700">
          <span>기본 정보</span>
          <span>상세 정보</span>
          <span>완료</span>
        </div>
        <div className="h-2 bg-green-100 rounded-full">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{width: `${calculateProgress()}%`}}
          />
        </div>
      </div>

      <form className="space-y-6">
        {/* 상품명 입력 필드 */}
        <div>
          <label className="block text-sm font-medium text-green-800">
            상품명
            <span className="text-green-600 text-sm ml-2">
              ({feedback.titleLength}/100자)
            </span>
          </label>
          <InputField
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm 
              ${feedback.titleValid ? 'border-green-300' : 'border-red-500'}
              focus:outline-none focus:ring-2 focus:ring-green-500`}
            placeholder="상품명을 입력해주세요 (5자 이상)"
          />
          {!feedback.titleValid && (
            <p className="mt-1 text-sm text-red-500">
              상품명은 5자 이상 100자 이하로 입력해주세요
            </p>
          )}
        </div>

        {/* 카테고리 선택 필드 */}
        <div>
          <label className="block text-sm font-medium text-green-800">
            카테고리
          </label>
          <DropDownSelector
          name='category'
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-green-500"
          options={selectItems}
          />
        </div>

        {/* 가격 입력 필드 */}
        <div>
          <label className="block text-sm font-medium text-green-800">
            가격
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`block w-full px-3 py-2 border rounded-md
                ${feedback.priceValid ? 'border-green-300' : 'border-red-500'}
                focus:outline-none focus:ring-2 focus:ring-green-500`}
              placeholder="가격을 입력해주세요"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-green-600">원</span>
            </div>
          </div>
          {!feedback.priceValid && (
            <p className="mt-1 text-sm text-red-500">
              올바른 가격을 입력해주세요 (1원 ~ 1000만원)
            </p>
          )}
        </div>

        {/* 상품 설명 입력 필드 */}
        <div>
          <label className="block text-sm font-medium text-green-800">
            상품 설명
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="상품 설명을 입력해주세요"
          />
        </div>

        {/* 도움말 섹션 */}
        <div className="bg-green-50 p-4 rounded-md mt-8 border border-green-200">
          <h3 className="font-medium text-green-800">📝 상품 등록 도움말</h3>
          <ul className="mt-2 text-sm text-green-700 space-y-1">
            <li>• 상품명은 구매자가 쉽게 이해할 수 있게 작성해주세요</li>
            <li>• 정확한 가격을 입력해주세요</li>
            <li>• 상품 설명은 상세히 작성할수록 좋습니다</li>
          </ul>
        </div>

        {/* 제출 버튼 */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 
              transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            상품 등록하기
          </button>
        </div>
      </form>
    </div>
  );
}