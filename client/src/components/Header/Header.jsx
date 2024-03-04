/* eslint-disable no-undef */
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { tablet } from "../../utils/styleTheme";
import HeaderMenu from "./HeaderMenu";
// import SearchBar from "./SearchBar";

const Header = () => {
  const userInfo = useSelector((state) => state.user);
  const location = useLocation();

  if (location.pathname === "/") return null;
  return (
    <Container>
      <LogoBox>
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/main_logo.png`}
            alt="logo"
          />
        </Link>
      </LogoBox>
      {userInfo.isLogin ? (
        <HeaderMenu login={true} info={userInfo} />
      ) : (
        <HeaderMenu login={false} info={userInfo} />
      )}
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 64px;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 200;

  @media ${tablet} {
    padding: 0 20px;
  }
`;

const LogoBox = styled.div`
  flex: 0.5;
  margin-top: 5px;
  display: flex;
  justify-content: center;

  img {
    width: 120px;
  }
`;

export default Header;
