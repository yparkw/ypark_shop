import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/apiService';
import ProductsList from '../components/productsList';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getProducts().then(response => {
      setItems(response.data);
    });
  }, []);

  return <ProductsList items={items} />;
};

export default App;