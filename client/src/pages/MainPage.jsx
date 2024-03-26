/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

export default function MainPage() {
    const navigate = useNavigate();

    // const handleEnterClick = () => {
    //     navigate('/shop');
    // };

    const getVideoSource = () => {
      if (window.innerWidth >= 768) { // 데스크탑 화면 크기 기준 (예: 768px)
        return `${process.env.PUBLIC_URL}/assets/videos/loading_desktop.mp4`;
      } else {
        return `${process.env.PUBLIC_URL}/assets/videos/loading_mobile.mp4`;
      }
    };

    useEffect(() => {
      const timer = setTimeout(() => {
        navigate('/shop');
      }, 5500);

      return () => clearTimeout(timer);
    }, [navigate]);


    const [videoSrc, setVideoSrc] = useState(getVideoSource());

    
    
    useEffect(() => {
      const handleResize = () => {
        setVideoSrc(getVideoSource());
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    
    

  return (
      <VideoContainer>
        <Video autoPlay loop muted>
          <source src={videoSrc} type="video/mp4" />
        </Video>
      </VideoContainer>
  );
}

const VideoContainer = styled.div`
position: relative;
width: 100%; // 화면의 전체 너비를 차지
height: 100vh; // 화면의 전체 높이를 차지
display: flex;
justify-content: center; // 가로 중앙 정렬
align-items: center; // 세로 중앙 정렬
background-color: black; // 배경색을 검은색으로 설정
`;

const Video = styled.video`
width:100vw
height: 100vh;
// 영상의 가로세로 비율이 유지되면서 중앙에 위치하도록 설정
// object-fit: cover; 옵션은 영상이 container를 꽉 채우도록 하면서도 비율을 유지하게 해줌
object-fit: cover;
`;
