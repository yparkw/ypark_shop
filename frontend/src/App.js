import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ShoppingCartPage from './pages/ShoppingCartPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/user" component={MyPage} />
        <Route path="/product/:id" component={ProductDetailPage} />
        <Route path="/cart" component={ShoppingCartPage} />
        {/* 다른 라우트들을 여기에 추가할 수 있습니다 */}
      </Switch>
    </Router>
  );
}

export default App;
