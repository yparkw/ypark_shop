/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import PurchaseForm from "../components/Purchase/PurchaseForm";


export default function PurchasePage() {
    const location = useLocation();
    const orderInfo = location.state?.orderInfo;
    const userInfo = useSelector((state) => state.user);
    console.log("orderInfo: ", location.state)


    return (
      <Container>
        <PurchaseForm userInfo={userInfo} orderInfo={orderInfo}/>
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