import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const hideHeader = ['/', '/register'].includes(location.pathname);
  if (hideHeader) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/')
  };

  return (
    <header className="bg-primary p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold">
        TestMaster
      </div>
      <button
        onClick={handleLogout}
        className="bg-sky-500 text-white py-2 px-4 rounded  hover:bg-sky-600 hover:text-gray-700"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
