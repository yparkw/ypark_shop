/* eslint-disable no-undef */
import React from "react";
import styled from "styled-components";
import LoginForm from "../components/Login/LoginForm";
import SubBanner from "../components/SubBanner/Subbanner";

export default function LoginPage() {
  return (
    <Container>
      <SubBanner
        imgUrl={`${process.env.PUBLIC_URL}/assets/images/main_banner_1920x460.png`}
      />
      <LoginForm />
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
