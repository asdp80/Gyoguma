import React from 'react';

function ChatroomPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="flex-1 flex flex-col bg-white">
        <div className="border-b p-4">
          <h1 className="text-xl font-bold">채팅방</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {/* 채팅 메시지들이 들어갈 자리 */}
          <p className="text-gray-600">채팅 메시지가 이곳에 표시됩니다.</p>
        </div>
        <div className="border-t p-4">
          {/* 메시지 입력창이 들어갈 자리 */}
          <p className="text-gray-600">메시지 입력 폼이 이곳에 구현됩니다.</p>
        </div>
      </div>
    </div>
  );
}

export default ChatroomPage;