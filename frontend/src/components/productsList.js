import React from 'react';

const productsList = ({ products }) => {
  return (
    <ul>
      {products.map(product => <li key={product.id}>{product.name}</li>)}
    </ul>
  );
};

export default productsList;