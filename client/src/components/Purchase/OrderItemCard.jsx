/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


export default function OrderItemCard(props) {
  const navigate = useNavigate();

  
  const handleshippingClick = () => {
    console.log('shipping', );
  }

  const handleDelete = () => {
    // 여기서 삭제 로직을 구현합니다.
  };

  const handleShowDetail = () => {

  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  }

  return (
    <CardContainer>
      <UserInfo>
      {/* <ItemImage src={props.productImg} alt="productImg"/> */}
        <ItemName>이메일: {props.buyer_email}</ItemName>
        <ItemName>연락처: {props.buyer_tel}</ItemName>
        <ItemName>주소: {props.buyer_address}({props.buyer_postcode}) {props.buyer_detailAddress}</ItemName>
      {/* <Price>{formatPrice(props.price)}원</Price> */}
      </UserInfo>
      <ButtonGroup>
        <Button onClick={handleShowDetail}>주문상세</Button>
        <Button onClick={handleshippingClick}>배송</Button>
        <Button onClick={handleDelete}>환불</Button>
      </ButtonGroup>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eaeaea;
`;

const UserInfo = styled.div`
  // Styles for the user information section
  margin-bottom: 12px; // Adjust as necessary
`;

const ItemName = styled.div`
  font-size: 20px;
  color: #333;
  margin-bottom: 4px; 
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 12px;
`;

const Button = styled.button`
  padding: 8px 12px; // 버튼의 패딩을 지정합니다.
  border: 1px solid #ddd; // 버튼의 테두리를 지정합니다.
  background-color: #f8f8f8; // 버튼의 배경색을 지정합니다.
  cursor: pointer; // 마우스 커서를 포인터로 지정합니다.
  &:hover {
    background-color: #e8e8e8; // 호버 상태의 배경색을 지정합니다.
  }
`;

