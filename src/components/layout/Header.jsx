// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}`);
  };

  return (
    <header className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">Token Talk</Link>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              className="w-full px-4 py-2 rounded-lg text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="hover:text-gray-200">Profile</Link>
                <button onClick={logout} className="hover:text-gray-200">Logout</button>
              </>
            ) : (
              <Link to="/login" className="hover:text-gray-200">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;