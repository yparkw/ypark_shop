/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


function UserInfoCard(props) {
  const navigate = useNavigate();  
  console.log('UsersInfo_props', props )

  
  const handleEditClick = () => {
    console.log('adminitemscard_editclick', {state : {user: props}});
    navigate("/", { state : { user: props } });
  }

  const handleDelete = () => {
    // 여기서 삭제 로직을 구현합니다.
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  }

  return (
    <CardContainer>
      <ItemName>{props.email}</ItemName>
      <ButtonGroup>
        <Button onClick={handleEditClick}>수정</Button>
        <Button onClick={handleDelete}>삭제</Button>
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

const ItemName = styled.span`
  flex-grow: 1;
  text-align: center;
  font-size: 30px; // 글자 크기를 지정합니다.
  color: #333; // 글자 색상을 지정합니다.
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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

export default UserInfoCard;