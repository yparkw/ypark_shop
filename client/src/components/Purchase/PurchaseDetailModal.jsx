/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line
import React from 'react';
import styled from 'styled-components';

const PurchaseDetailModal = (props) => {
    if (!props.isVisible) return null;
  
    const onClose = () => {
      props.setIsVisible(false);
    }
    return (
      <ModalContainer>
        <ModalContent>
          <button onClick={onClose}>닫기</button>
          {props.data ? (
            <div>
              <p>상품명: {props.product.name}</p>
              <p>수량: {props.quantity}</p>
              <p>사이즈: {props.size}</p>
              {/* 여기에 필요한 다른 주문 상세 정보를 추가합니다. */}
            </div>
          ) : (
            <p>상세 정보를 불러오는 중입니다...</p>
          )}
        </ModalContent>
      </ModalContainer>
    );
  };
  
  const ModalContainer = styled.div`
    // 모달 컨테이너에 대한 스타일
  `;
  
  const ModalContent = styled.div`
    // 모달 컨텐츠에 대한 스타일
  `;
  
  export default PurchaseDetailModal;