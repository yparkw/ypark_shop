/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line
import React from 'react';
import styled from 'styled-components';

const PurchaseDetailModal = (props) => {
    if (!props.isVisible) return null;
    console.log("PurchaseDetailModal", props);
  
    const onClose = () => {
      props.setIsVisible(false);
    }
    return (
      <ModalContainer>
        <ModalContent>
          <button onClick={onClose}>닫기</button>
          {Array.isArray(props.purchaseDetails) ? ( // 배열인지 확인합니다.
          props.purchaseDetails.map((detail, index) => (
            <DetailItem key={index}>
              <p>상품명: {detail.product_name}</p>
              <p>수량: {detail.quantity}</p>
              <p>사이즈: {detail.size}</p>
              {/* 필요한 다른 주문 상세 정보를 여기에 추가합니다. */}
            </DetailItem>
          ))
          ) : (
            <p>상세 정보를 불러오는 중입니다...</p> // 배열이 아니라면 이 메시지를 보여줍니다.
          )}
        </ModalContent>
      </ModalContainer>
    );
  };
  
  const ModalContainer = styled.div`
  position: fixed; // 모달을 화면에 고정시킵니다.
  top: 50%; // 상단에서 50%의 위치에 배치합니다.
  left: 50%; // 왼쪽에서 50%의 위치에 배치합니다.
  transform: translate(-50%, -50%); // 정확한 중앙에 위치하도록 조정합니다.
  z-index: 1000; // 모달이 다른 요소 위에 표시되도록 z-index 값을 높입니다.
  background: white; // 모달 배경을 흰색으로 설정합니다.
  padding: 20px; // 패딩을 추가합니다.
  border-radius: 10px; // 모달의 모서리를 둥글게 합니다.
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); // 그림자 효과를 추가합니다.
  width: 80%; // 모달의 너비를 설정합니다.
  max-width: 600px; // 모달의 최대 너비를 설정합니다.
  max-height: 80vh; // 모달의 최대 높이를 화면 높이의 80%로 제한합니다.
  overflow-y: auto; // 세로 스크롤을 가능하게 합니다.
  `;
  
  const ModalContent = styled.div`
  display: flex; // Flexbox 레이아웃을 적용합니다.
  flex-direction: row; // 항목들을 가로로 나열합니다.
  flex-wrap: wrap; // 내용이 넘칠 경우 다음 줄로 넘깁니다.
  gap: 10px; // 항목들 사이의 간격을 설정합니다.
  `;
  const DetailItem = styled.div`
  background: #f7f7f7; // 배경색을 설정합니다.
  padding: 10px; // 패딩을 추가합니다.
  border-radius: 5px; // 모서리를 둥글게 합니다.
  margin-bottom: 10px; // 마진을 추가하여 항목들 사이의 간격을 조정합니다.
  width: 100%; // 가로 전체 너비를 차지하게 합니다.
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // 그
  `
  
  export default PurchaseDetailModal;