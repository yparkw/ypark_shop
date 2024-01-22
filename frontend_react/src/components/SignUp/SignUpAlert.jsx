import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SignUpAlert = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <Backdrop>
      <Modal>
        <h2>회원가입이 완료되었습니다!</h2>
        <p>로그인 해주시길 바랍니다.</p>
        <Button onClick={onClose}>확인</Button>
      </Modal>
    </Backdrop>
  );
};

SignUpAlert.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;

  h2 {
    margin-top: 0;
  }

  p {
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  background-color: #2d7df4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export default SignUpAlert;