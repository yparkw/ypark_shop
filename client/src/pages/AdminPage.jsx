import React from "react";
// import { useSelector } from "react-redux";
import { Route, Routes} from "react-router-dom";
import styled from "styled-components";
import ProductList from "../components/Admin/ProductList"
import OrderList from "../components/Admin/OrderList"
import SellList from "../components/Admin/SellList"
import UserList from "../components/Admin/UserList"
import AdminPageMenuBox  from "../components/Admin/AdminPageMenuBox";



export default function AdminPage() {
  return (
    <Container>
      <ContentsWrapper>
      <AdminPageMenuBox />
        <Routes>
          <Route index element={<ProductList />} />
          <Route path='product' element={<ProductList />} />
          <Route path="order" element={<OrderList />} />
          <Route path="sell" element={<SellList />} />
          <Route path="user" element={<UserList />} />
        </Routes>
      </ContentsWrapper>
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  justify-content: center;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  max-width: 1060px;
`;

