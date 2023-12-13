import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ShoppingCartPage from './pages/ShoppingCartPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={HomePage} />
        <Route path="/user" element={MyPage} />
        <Route path="/product/:id" element={ProductDetailPage} />
        <Route path="/cart" element={ShoppingCartPage} />
        {/* 다른 라우트들을 여기에 추가할 수 있습니다 */}
      </Routes>
    </Router>
  );
}

export default App;
