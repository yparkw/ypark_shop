/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useSelector  } from "react-redux";
import styled from "styled-components";
import useGetProductItems from "../../hooks/useGetProductItems";
import OrderItemCard from "./OrderItemCard"
import { desktop, mobile, tablet } from "../../utils/styleTheme";
import ErrorPage from "../Commons/ErrorPage";
import NoItems from "../Commons/NoItems";
import { Link } from 'react-router-dom';
import Skeleton from "../Commons/Skeleton";
import useGetOrderList from "../../hooks/useGetOrderList";

export default function OrderItems(props) {
    const [onLoading, setOnLoading] = useState(false);
   
    const getDataList = useGetOrderList(props.param, setOnLoading);
    console.log("list", getDataList);

    
    if (getDataList.isSuccess && Array.isArray(getDataList.data.data) && !getDataList.data.data.length) {
      return <NoItems />;
    }
  
    if (getDataList.isError) {
      return (
        <ErrorPage
          errorText={"Network Error"}
          retryAction={getDataList.refetch}
        />
      );
    }
  
    return (
    <>
      <Container>
        {getDataList.isSuccess && Array.isArray(getDataList.data?.data) &&
          getDataList.data.data.map((datas) => {
            return (
              <OrderItemCard
                key={datas.id}
                id={datas.id}
                imp_uid={datas.imp_uid}
                marchant_uid={datas.merchant_uid}
                price = {datas.amount}
                status = {datas.status}
                buyer_name = {datas.buyer_name}
                buyer_email = {datas.buyer_email}
                buyer_tel = {datas.buyer_tel}
                buyer_address = {datas.buyer_address}
                buyer_detailAddress = {datas.buyer_detailAddress}
                buyer_postcode = {datas.buyer_postcode}
                products = {datas.products}
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
  
