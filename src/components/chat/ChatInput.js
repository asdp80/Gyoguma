// 채팅 입력 컴포넌트
// 텍스트 입력, 이미지 첨부?

import InputField from "../common/InputField";
import Button from "../common/Button"

const ChatInput = (props) => {
    const {
        value,
        onClick,
        onChange
    } = props

  return (
    <div className="flex items-center p-4 bg-orange-100 border-t border-orange-300 rounded-b-lg">
      <InputField
        type="text"
        placeholder="메세지를 입력하세요..."
        value={value}
        onChange={onChange}
        className="flex-grow p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <Button
        onClick={onClick}
        className="ml-4 px-2 py-1.5 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition"
      >
        <img className='w-[32px] h-[30px]' src='/images/enter.png' alt='보내기' />
      </Button>
    </div>
  );
};

export default ChatInput;
