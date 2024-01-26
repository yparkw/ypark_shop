/* eslint-disable no-undef */
import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { mobile, tablet } from "../../utils/styleTheme";

function Footer() {
  return (
    <Container>
      <div className="Footer-Left">
        <span>
          Take what you want
        </span>
      </div>
      <div className="Footer-Middle">
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo_demo02_white.svg`}
            alt="logo"
          />
        </Link>
      </div>

      <div className="Footer-Right">
        <p>CEO: Park</p>
        <p>E-Mail: part@naver.com</p>
      </div>
    </Container>
  );
}

const Container = styled.footer`
  height: 80px;
  width: 100%;
  bottom: 0;
  position: absolute;
  background-color: #4b4b4b;
  display: flex;

  padding: 0 64px;

  @media ${tablet} {
    height: 140px;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  @media ${mobile} {
    height: 200px;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
