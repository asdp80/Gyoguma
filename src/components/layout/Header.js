// src/components/layout/Header.js
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Dashboard from "../dashboard/Dashboard";
import InputField from "../common/InputField";
import { useCallback, useState } from "react";

function Header() {
  const [searchText, setSearchText] = useState('');
  const { isAuthenticated } = useSelector(state => state.auth);

  const onSearchChange = useCallback(e => {
    setSearchText(e.target.value);
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="교구마" className="h-10" />
            <span className="text-gyoguma-dark font-bold text-xl">교구마</span>
          </Link>

          <div className="flex-1 max-w-2xl mx-8">
            <InputField
              type='text'
              placeholder='검색'
              value={searchText}
              onChange={onSearchChange}
            />
          </div>

          <Dashboard />
        </div>
      </div>
    </header>
  );
}

export default Header;