/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { usePatchPurchase } from "../../hooks/usePatchPurchase";

export default function OrderItemCard(props) {
  const navigate = useNavigate();

  const { handleStatusChange, isLoading, error } = usePatchPurchase();
  const isoDateString = props.created_at;
  const date = new Date(isoDateString);
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    // second: 'numeric',
    // timeZoneName: 'short',
  });
  const formattedDate = formatter.format(date);

  
  const handleShippingClick = () => {
    handleStatusChange(props.id, 'shipping');
  }

  const handleRefundClick = () => {
    handleStatusChange(props.id, 'Refund')
  };

  const handleShowDetail = () => {

  };


  const handlePurchaseConfirmClick = () => {
    handleStatusChange(props.id, 'cofirmed');
  };
  // const formatPrice = (price) => {
  //   return new Intl.NumberFormat('ko-KR').format(price);
  // }

  const renderButtons = () => {
    switch (props.status) {
      case 'order':
        return (
          <>
            <Button onClick={handleShippingClick}>배송 시작</Button>
            <Button onClick={handleRefundClick}>환불 처리</Button>
          </>
        );
      case 'shipping':
        return <Button onClick={handlePurchaseConfirmClick}>구매 확정</Button>;
      case 'purchaseConfirmed':
        // 구매 확정 상태에서는 특별한 버튼을 보여줄 필요가 없을 수 있습니다.
        return null;
      default:
        // 기본적으로 상세보기 버튼만 보여줍니다.
        return <Button onClick={handleShowDetail}>주문상세</Button>;
    }
  };

  return (
    <CardContainer>
      <UserInfo>
      {/* <ItemImage src={props.productImg} alt="productImg"/> */}
        <ItemName>주문날짜: {formattedDate}</ItemName>
        <ItemName>이메일: {props.buyer_email}</ItemName>
        <ItemName>연락처: {props.buyer_tel}</ItemName>
        <ItemName>주소: {props.buyer_address}({props.buyer_postcode}) {props.buyer_detailAddress}</ItemName>
      {/* <Price>{formatPrice(props.price)}원</Price> */}
      </UserInfo>
      <ButtonGroup>
        {renderButtons()}
      </ButtonGroup>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column; // 기본적으로 세로 방향으로 배열합니다.
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eaeaea;

  @media (min-width: 768px) {
    flex-direction: row; // 화면 너비가 768px 이상일 때 가로 방향으로 배열합니다.
  }
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
  flex-direction: column;
  gap: 10px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row; // 화면 너비가 768px 이상일 때 버튼을 가로로 배열합니다.
    justify-content: flex-end;
    gap: 10px;
    margin-top: 12px;
    width: auto; // 데스크톱 화면에서는 버튼 그룹의 너비를 자동 조정합니다.
  }
`;

const Button = styled.button`
  padding: 12px 20px; // 버튼의 패딩을 지정합니다.
  border: 1px solid #ddd; // 버튼의 테두리를 지정합니다.
  background-color: #f8f8f8; // 버튼의 배경색을 지정합니다.
  cursor: pointer; // 마우스 커서를 포인터로 지정합니다.
  &:hover {
    background-color: #e8e8e8; // 호버 상태의 배경색을 지정합니다.
  }
`;

