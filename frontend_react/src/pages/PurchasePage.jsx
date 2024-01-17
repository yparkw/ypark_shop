/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PurchaseForm from "../components/Purchase/PurchaseForm";


export default function PurchasePage() {
    const userInfo = useSelector((state) => state.user);

    // const userInfo = {
    //     address: '1234 Main St',
    //     phone: '123-456-7890',
    //     email: 'user@example.com',
    //     postcode: '10001',
    //     // ... more user info
    //   }; // 임시 유저
    const cartItems = [
        { name: 'Product 1', quantity: 1, price: '1000' },
        { name: 'Product 2', quantity: 2, price: '2000' },
        // ... more items
      ]; // 임시 아이템
    return (
      <Container>
        <PurchaseForm cartItems={cartItems} userInfo={userInfo}/>
      </Container>
    );
  }
  
  const Container = styled.article`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `;