/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line
import React, {useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import EditUserModal from "../Modals/EditUserModal";
import useUserUpdater from "../../hooks/useUserUpdater";
import useDeleteUserData from "../../hooks/useDeleteUser";



function UserInfoCard(props) {
  const navigate = useNavigate();  
  const [isEditing, setIsEditing] = useState(false);

  
  const handleEditClick = () => {
    setIsEditing(true);
  }

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const { updateUser } = useUserUpdater();

  const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUserData();
  
  const handleSaveChanges = async ( editedUserData ) => {
    // 저장 로직을 구현합니다.
    setIsEditing(false);
    try {
      await updateUser(props.id, editedUserData); // 수정된 사용자 데이터로 업데이트 요청을 보냅니다.
      // 성공적으로 업데이트한 후 필요한 작업을 수행합니다. 예를 들어, 페이지를 새로 고침하거나 사용자에게 알림을 표시할 수 있습니다.
      props.onUserUpdate();
    } catch (error) {
      // 에러 처리: 사용자에게 실패 메시지를 표시할 수 있습니다.
      console.error("사용자 정보 업데이트 중 오류 발생:", error);
      setIsEditing(true); // 에러가 발생했을 경우, 사용자가 다시 수정할 수 있도록 모달을 열어둡니다.
    }
  };

  const handleDelete = async (  ) => {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
    if (isConfirmed){
      try{
        await deleteUser(props.id);
      } catch (error) {
        console.log("삭제 실패: ", error);
      }
    } else {
      console.log("삭제 작업이 취소되었습니다.");
    }
  };

  return (
    <>
    <CardContainer>
      <Item>{props.email}</Item>
      <Item>{props.phone}</Item>
      <ButtonGroup>
        <Button onClick={handleEditClick}>수정</Button>
        <Button onClick={handleDelete}>삭제</Button>
      </ButtonGroup>
    </CardContainer>
      {isEditing && (
        <EditUserModal
          user={props}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
        />
      )}
    </>
  );
}

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eaeaea;
`;

const Item = styled.span`
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