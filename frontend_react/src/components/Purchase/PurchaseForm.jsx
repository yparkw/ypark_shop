/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';

export default function PurchaseForm({ cartItems, userInfo }) {
  const [orderDetails, setOrderDetails] = useState({
    address: userInfo.address || '',
    phone: userInfo.phone || '',
    email: userInfo.email || '',
    postcode: userInfo.postcode || '',
    paymentMethod: 'card', // default payment method
  });

  const handleInputChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the order details
    console.log(orderDetails);
  };

  return (
    <Container>
      <OrderList>
        {cartItems.map((item, index) => (
          <OrderItem key={index}>
            <span>{item.name}</span>
            <span>{item.quantity}</span>
            <span>{item.price}</span>
          </OrderItem>
        ))}
      </OrderList>
      <Form onSubmit={handleSubmit}>
        <Input 
          type="text" 
          name="address" 
          value={orderDetails.address} 
          onChange={handleInputChange} 
          placeholder="Address" 
        />
        <Input 
          type="text" 
          name="phone" 
          value={orderDetails.phone} 
          onChange={handleInputChange} 
          placeholder="Phone Number" 
        />
        <Input 
          type="email" 
          name="email" 
          value={orderDetails.email} 
          onChange={handleInputChange} 
          placeholder="Email" 
        />
        <Input 
      type="text" 
      name="postcode" 
      value={orderDetails.postcode} 
      onChange={handleInputChange} 
      placeholder="Postcode" 
        />
        <PaymentMethodSelect 
        name="paymentMethod" 
        value={orderDetails.paymentMethod} 
        onChange={handleInputChange}
        >
        <option value="card">Card Payment</option>
        <option value="naver">Naver Payment</option>
        <option value="kakao">Kakao Payment</option>
        </PaymentMethodSelect>
        <SubmitButton type="submit">Place Order</SubmitButton>
    </Form>
    </Container>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const OrderList = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PaymentMethodSelect = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;