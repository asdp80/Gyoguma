
const ChatCompleteButton = ({ isComplete, onComplete }) => {
  return (
    <div className="p-4 bg-orange-100 border-t border-orange-300 flex justify-end">
      <button
        onClick={onComplete}
        disabled={isComplete}
        className={`px-4 py-2 rounded-md ${
          isComplete
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {isComplete ? "거래 완료 대기 중" : "거래 완료"}
      </button>
    </div>
  );
};

export default ChatCompleteButton;
