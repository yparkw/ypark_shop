/* eslint-disable no-undef */
import React from "react";
import styled from "styled-components";

import { useLocation } from "react-router-dom";
import { mobile, tablet } from "../../utils/styleTheme";

function Footer() {
  const location = useLocation();

  if (location.pathname === "/") return null;
  return (
    <Container>
      <span>
      <div>상호명: 와이파크떠블유(YPARKW)</div>
      <div>사업장소재지: 경기도 김포시 김포한강 9로 95, 301호R402(구래동)</div>
      <div>사업의 종류: 도소매</div>
      <div>종목: 의류 상거래</div>
      <div>개업일: 2024년 02월 08일</div>
      </span>
      <span>
      <div>대표: 박용우</div>
      <div>연락처: 010-5603-6059</div>
      <div>email: dyddn1029@naver.com</div>
      </span>
    </Container>
  );
}



const Container = styled.footer`
  height: auto;
  width: 100%;
  bottom: 0;
  position: absolute;
  background-color: #4b4b4b;
  display: flex;
  color: white;
  font-size: 15px;
  text-align:left;

  padding: 0 64px;

  @media ${tablet} {
    padding: 20px; // 모바일에 적합하게 패딩 조정
    flex-direction: column;
    align-items: flex-start; // 모바일 뷰에서 왼쪽 정렬

    span {
      display: block; // 각 span을 블록 요소로 만들어 줍니다.
      width: 100%; // span의 너비를 100%로 만들어 줍니다.
      margin-bottom: 10px; // 각 span 아래에 여백을 줍니다.
    }

    div {
      justify-content: flex-start; // div의 내용을 왼쪽으로 정렬합니다.
      text-align: left; // 텍스트를 왼쪽 정렬합니다.
    }
  }

  @media ${mobile} {
    padding: 20px; // 모바일에 적합하게 패딩 조정
    flex-direction: column;
    align-items: flex-start; // 모바일 뷰에서 왼쪽 정렬

    span {
      display: block; // 각 span을 블록 요소로 만들어 줍니다.
      width: 100%; // span의 너비를 100%로 만들어 줍니다.
      margin-bottom: 10px; // 각 span 아래에 여백을 줍니다.
    }

    div {
      justify-content: flex-start; // div의 내용을 왼쪽으로 정렬합니다.
      text-align: left; // 텍스트를 왼쪽 정렬합니다.
    }
  }

  div {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
  
  span {
    padding: 10px;
  }

  .Footer-Middle {
    a {
      color: white;
    }

    img {
      width: 120px;
    }
  }

  .Footer-Left {
    text {
      text-decoration: none;
      color: white;
    }
  }

  .Footer-Right {
    text {
      color: white;
      padding: 5px 7px;
      margin: 0 10px;
      font-size: 15px;
      display: flex;
      align-items: center;
    }
  }
`;



export default Footer;
