// src/components/dashboard/UserProfile.js
import { Link } from "react-router-dom";
import { User, ChevronDown, Box, History, Store, UserCircle, Star } from "lucide-react";

function UserProfile({user}) {
  console.log(user)
  return (
    <div className="relative group">
      <button className="flex items-center gap-2 hover:text-gyoguma">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
          <User className="w-5 h-5 text-gray-500" />
        </div>
        <span className="text-gray-700">{user}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {/* 드롭다운 메뉴 */}
      <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl invisible group-hover:visible">
        <Link to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
          <UserCircle className="w-4 h-4" />
          프로필 정보
        </Link>
        <Link to="/my-items" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
          <Box className="w-4 h-4" />
          내 상품
        </Link>
        <Link to="/purchase-history" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
          <History className="w-4 h-4" />
          구매 내역
        </Link>
        <Link to="/sales-history" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
          <Store className="w-4 h-4" />
          판매 내역
        </Link>
        <div className="px-4 py-2 border-t">
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            학점
          </div>
          <div className="font-medium">4.5</div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;