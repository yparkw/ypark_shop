/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styled from "styled-components";
import useGetOrderList from "../../hooks/useGetOrderList";
import ErrorPage from "../Commons/ErrorPage";
import NoItems from "../Commons/NoItems";
import OrderItemCard from "./OrderItemCard";

export default function OrderItems(props) {
    const [onLoading, setOnLoading] = useState(false);
    

   
    const { data, isLoading, isError, refetch } = useGetOrderList(setOnLoading);
    
    
    console.log("list", data);

    
    if (!isLoading && !isError && data && Array.isArray(data.data) && !data.data.length) {
        return <NoItems />;
    }

    // if (isSuccess && Array.isArray(data.data.data) && !data.data.data.length) {
    //   return <NoItems />;
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
    <>
      <Container>
        {data && Array.isArray(data.data) &&
          data.data.map((datas) => {
            return (
              <OrderItemCard
                key={datas.id}
                id={datas.id}
                imp_uid={datas.imp_uid}
                merchant_uid={datas.merchant_uid}
                created_at={datas.created_at}
                price={datas.amount}
                status={datas.status}
                buyer_name={datas.buyer_name}
                buyer_email={datas.buyer_email}
                buyer_tel={datas.buyer_tel}
                buyer_address={datas.buyer_address}
                buyer_detailAddress={datas.buyer_detailAddress}
                buyer_postcode={datas.buyer_postcode}
                products={datas.products}
              />
            );
          })}   
      </Container>
    </>
    );
  }
  
// 스타일 정의
const Container = styled.section`
  display: flex;
  flex-direction: column;
  // align-items: flex-start;
  padding: 20px;
  width: 100%;
`;
  
