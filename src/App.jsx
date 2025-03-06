// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CategoryProvider } from './context/CategoryContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CryptoDetail from './pages/CryptoDetail';
import Profile from './pages/Profile';
import Categories from './pages/Categories';
import TokenList from './pages/TokenList';

function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/crypto/:id" element={<CryptoDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/category/:categoryId" element={<TokenList />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;