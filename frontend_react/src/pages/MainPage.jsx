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
              <Video autoPlay loop muted>
                    <source src={`${process.env.PUBLIC_URL}/assets/videos/door_proto.mp4`} type="video/mp4" />
                </Video>
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
  width: 100%; /* 너비를 지정합니다. */
  max-width: 640px; /* 최대 너비를 지정할 수 있습니다. */
  height: auto; /* 비디오의 비율에 맞게 높이를 자동 조정합니다. */
`;

const Video = styled.video`
  width: 100%;
  height: auto;
`;


const EnterButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
