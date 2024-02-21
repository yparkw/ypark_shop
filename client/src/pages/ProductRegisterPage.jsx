import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductRegisterForm from "../components/ProductRegister/ProductRegisterForm";

export default function ProductRegisterPage() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user);
  

  useEffect(() => {
    if (userInfo.role !== "is_admin" || !userInfo.role) {
      navigate("/product-register"); // 디버깅 중 기존 네비게이팅 "/"
    }
  }, []);

  return (
    <Container>
      <ProductRegisterForm />
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  justify-content: center;
`;
