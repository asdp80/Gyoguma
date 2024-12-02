import React from 'react';

function ChatMainPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">채팅 메인</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow">
          {/* 채팅 목록이 들어갈 자리 */}
          <p className="text-gray-600">채팅 목록이 표시됩니다.</p>
        </div>
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          {/* 채팅 내용이 들어갈 자리 */}
          <p className="text-gray-600">채팅방을 선택하면 대화 내용이 표시됩니다.</p>
        </div>
      </div>
    </div>
  );
}

export default ChatMainPage;