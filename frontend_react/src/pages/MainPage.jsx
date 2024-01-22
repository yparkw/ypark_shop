/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
    const navigate = useNavigate();

    const handleEnterClick = () => {
        navigate('/shop');
    };

  return (
    <Container>
            <VideoContainer>
                    <source src={`${process.env.PUBLIC_URL}/assets/door_proto.mp4`} type="video/mp4" />
                <EnterButton onClick={handleEnterClick}>입장</EnterButton>
            </VideoContainer>
    </Container>
  );
}

const Container = styled.div`
  /* Your container styles */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Adjust to your preferred height */
`;


const VideoContainer = styled.div`
  position: relative;
  text-align: center;
`;

const EnterButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
