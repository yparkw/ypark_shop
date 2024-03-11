/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState} from "react";
import useGetOrderList from "../../hooks/useGetOrderList";
// import Loading from "../Commons/Loading";
import styled from "styled-components";
import OrderItem from "./OrderItem";
import NoItems from "../Commons/NoItems";
import ErrorPage from "../Commons/ErrorPage";

export default function MyOrderList() {
  const [onLoading, setOnLoading] = useState(false);
   
  const { data, isLoading, isError, refetch } = useGetOrderList(setOnLoading);

  console.log("getOrderList", data)

  if (!isLoading && !isError && data && Array.isArray(data.data) && !data.data.length) {
    return <NoItems />;
  }

  // if (getOrderList.isLoading) {
  //   return <Loading />;
  // }

  // if (!getOrderList.data) {
  //   return <NoItems shopLink={true} />;
  // }

  if (isError) {
    return (
      <ErrorPage
        errorText={"Network Error"}
        retryAction={refetch}
      />
    );
  }

  return (
    <Container>
      <FormHeader>
        <MenuBox>PRODUCT NAME</MenuBox>
        <MenuBox>OPTION</MenuBox>
        <MenuBox>STATUS</MenuBox>
      </FormHeader>
      <FormBody>
        {data && Array.isArray(data.data) &&
          data.data.map((v) => {
          return (
            <OrderItem
              key={v.id}
              orderStatus={v.status}
              products={v.products}
            />
          );
        })}
      </FormBody>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const FormHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem 0;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d4d4d4;
  font-size: 14px;
`;

const MenuBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:nth-child(1) {
    flex: 2;
  }

  &:last-child {
    flex: 0.8;
  }
`;

const FormBody = styled.section`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;
