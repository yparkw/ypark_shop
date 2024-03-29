/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAddPurchaseInfo } from "../../hooks/useAddPurchaseInfo";
import { paymentClickHandler } from '../../api/payment';
import { useNavigate } from "react-router-dom";

export default function PurchaseForm({ orderInfo, userInfo }) {
  const [orderDetails, setOrderDetails] = useState({
    merchant_uid: `mid_${new Date().getTime()}`,
    amount: '',
    address: userInfo.address || '',
    detailAddress: userInfo.detailAddress || '',
    phone: userInfo.phone || '',
    email: userInfo.email || '',
    postCode: userInfo.postCode || '',   
  });

  const addPurchaseInfo = useAddPurchaseInfo();

  const handleInputChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value,
    });
  };

  console.log('orderInfo', orderInfo);

  const navigate = useNavigate();
  const handlePayment = () => {

    const numericTotalAmount = orderInfo.reduce((total, item) => total + calculateTotalPrice(item), 0);
    const paymentData = {
      pg: 'html5_inicis.MOI6429104',
      paymentMethod: 'card', // default payment method
      merchant_uid : orderDetails.merchant_uid,
      name: '주문명:결제테스트',
      amount: numericTotalAmount,
      buyer_email: orderDetails.email,
      buyer_name: userInfo.name || '',
      buyer_tel: orderDetails.phone,
      buyer_addr: orderDetails.address,
      buyer_postcode: orderDetails.postCode,    
    };
    
    const onScuccess = async (res) => {
      console.log('suucess', res);
      const formData = {
        imp_uid: res.imp_uid,
        merchant_uid: res.merchant_uid,
        products: orderInfo.map(item => ({
          product_id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
        })),
        buyer_name: userInfo.name,
        buyer_email: userInfo.email,
        buyer_tel: userInfo.phone,
        buyer_address: userInfo.address,
        buyer_detailAddress: userInfo.detailAddress,
        buyer_postcode: userInfo.postCode,
      };
      try {
        const response = await addPurchaseInfo(formData);
        console.log("결제 검증 결과: ", response);
        navigate('/shop')          
      } catch(error) {
        console.error('결제 검증 에러: ', error);
      }
    };

    const onFauilure = (err) => {
      console.error('결제 실패: ', err);
    };

    paymentClickHandler(paymentData, orderInfo, 'direct', onScuccess, onFauilure);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  }



  const calculateTotalPrice = (item) => item.quantity * item.price;
  const totalAmount = formatPrice(orderInfo.reduce((total, item) => total + calculateTotalPrice(item), 0));

  
  return (
    
    <Container>
        <Table>
            <thead>
                <tr>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>사이즈</th>
                    <th>상품 가격</th>
                    <th>전체 가격</th>
                </tr>
            </thead>
            <tbody>
                {orderInfo.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.size}</td>
                        <td>{formatPrice(item.price)}</td>
                        <td>{formatPrice(calculateTotalPrice(item))}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <Points>사용 가능 포인트: {userInfo.points}</Points>
        <TotalAmount>결제 금액: {totalAmount} 원</TotalAmount>

    <SectionTitle>개인 정보</SectionTitle>
      <Form onSubmit={handleSubmit}>
      <Label>Email</Label>
        <Input 
          type="email" 
          name="email" 
          value={orderDetails.email} 
          onChange={handleInputChange} 
          placeholder="Email" 
        />
        <Label>Phone Number</Label>
        <Input 
          type="text" 
          name="phone" 
          value={orderDetails.phone} 
          onChange={handleInputChange} 
          placeholder="Phone Number" 
        />
    <SectionTitle>배송지 정보</SectionTitle>
    <Label>Address</Label>
        <Input 
            type="text" 
            name="address" 
            value={orderDetails.address} 
            onChange={handleInputChange} 
            placeholder="Address" 
        />
    <Label>Postcode</Label>
        <Input 
            type="text" 
            name="postCode" 
            value={orderDetails.postCode} 
            onChange={handleInputChange} 
            placeholder="Postcode" 
        />
    <Label>Detail Address</Label>
        <Input 
            type="text" 
            name="detailAddress" 
            value={orderDetails.detailAddress} 
            onChange={handleInputChange} 
            placeholder="Detail Address" 
        />
    
        <PaymentButtonsContainer>
          <PaymentButton onClick={() => handlePayment()}>
            결제하기
          </PaymentButton>
      </PaymentButtonsContainer>
    </Form>
    </Container>
    );
}

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #fff;

  @media (max-width: 768px) {
    padding: 10px;
    width: calc(100% - 20px);
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-top: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5em;
  color: #000;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;


const PaymentButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const PaymentButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    opacity: 0.8;
  }

  // 여기에 각 버튼별 색상 등 추가 스타일을 적용할 수 있습니다.
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #ddd;

  th, td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f8f8f8;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 8px; // 모바일에서 패딩 감소
    }

    // 모바일에서 테이블이 화면 너비에 맞도록 조정
    width: 100%;
    box-sizing: border-box;
    display: block;
    overflow-x: auto; // 필요한 경우 가로 스크롤 허용
    -webkit-overflow-scrolling: touch; // iOS에서 스크롤 성능 개선
    border: 0; // 모바일에서 테이블의 테두리 제거
    th {
      background-color: transparent; // 모바일에서 테이블 헤더 배경 제거
      position: sticky;
      top: 0; // 스크롤 시 테이블 헤더 고정
    }
  }
`;

const TotalAmount = styled.div`
  text-align: right;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const Points = styled.div`
text-align: right;
margin-top: 20px;
font-size: 20px;
font-weight: bold;
`;

const SectionTitle = styled.h4`
  margin-bottom: 10px;
  color: #333;
  font-size: 18px;
  border-bottom: 2px solid #007bff;
  display: inline-block;
`;

// 반응형 디자인을 위한 미디어 쿼리
// const media = {
//     mobile: '@media(max-width: 768px)'
//   };
  
// const ResponsiveContainer = styled(Container)`
// ${media.mobile} {
//     padding: 10px;
//     width: calc(100% - 20px);
// }
// `;

// const ResponsiveForm = styled(Form)`
// ${media.mobile} {
//     display: flex;
//     flex-direction: column;
// }
// `;

// const ResponsiveInput = styled(Input)`
// ${media.mobile} {
//     font-size: 14px;
// }
// `;

// const ResponsiveSubmitButton = styled(SubmitButton)`
// ${media.mobile} {
//     font-size: 14px;
// }
// `;