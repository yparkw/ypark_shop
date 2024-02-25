/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState} from "react";
import styled from "styled-components";

function EditUserModal({ user, onClose, onSave }) {
    const [editedUser, setEditedUser] = useState({
        email: user.email,
        phone: user.phone,
        address: user.address,
        detailAddress: user.detailAddress,
        is_admin: user.is_admin,
        is_staff: user.is_staff,
        is_active: user.is_active,
    });
  
    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedUser);
      };

    return (
      <ModalBackground onClick={onClose}>
        <ModalContainer onClick={e => e.stopPropagation()}>
        <Form>
          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Phone:</Label>
            <Input
              type="text"
              name="phone"
              value={editedUser.phone}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Address:</Label>
            <Input
              type="text"
              name="address"
              value={editedUser.address}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Detail Address:</Label>
            <Input
              type="text"
              name="detailAddress"
              value={editedUser.detailAddress}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Admin:</Label>
            <Checkbox
              type="checkbox"
              name="is_admin"
              checked={editedUser.is_admin}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Staff:</Label>
            <Checkbox
              type="checkbox"
              name="is_staff"
              checked={editedUser.is_staff}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Active:</Label>
            <Checkbox
              type="checkbox"
              name="is_active"
              checked={editedUser.is_active}
              onChange={handleChange}
            />
          </FormGroup>
          <ButtonGroup>
            <Button type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </ButtonGroup>
        </Form>
        </ModalContainer>
      </ModalBackground>
    );
  }
  
  const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.label`
  min-width: 100px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Checkbox = styled(Input)`
  flex-grow: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
  cursor: pointer;
  &:hover {
    background-color: #e8e8e8;
  }
`;
  const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10; // 다른 요소들 위에 모달이 표시되도록 z-index 설정
  `;
  
  const ModalContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  `;

export default EditUserModal;