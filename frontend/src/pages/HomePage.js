import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:8000/api/products/') // 백엔드 API 엔드포인트
        .then(response => {
          setProducts(response.data); // 데이터를 상태에 저장
        })
        .catch(error => {
          console.error("There was an error fetching the products", error);
        });
    }, []); // 빈 의존성 배열은 컴포넌트 마운트시 한 번만 요청함을 의미
  
    return (
      <div>
        <h1>상품 목록</h1>
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.name} - {product.price}</li> // 예시 데이터 필드
          ))}
        </ul>
      </div>
    );
  }
  
  export default HomePage;