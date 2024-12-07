// 별점 표시/입력 컴포넌트
// 리뷰 작성 시 별점 입력
import { useState } from "react";

const RatingModal = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating);
    } else {
      alert("별점을 선택해주세요!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">이번 거래는 어땠나요?</h2>
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => handleRating(value)}
              className={`w-10 h-10 mx-1 rounded-full ${
                value <= rating
                  ? "bg-yellow-400"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
