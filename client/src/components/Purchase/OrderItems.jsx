/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useSelector  } from "react-redux";
import styled from "styled-components";
import useGetProductItems from "../../hooks/useGetProductItems";
import { desktop, mobile, tablet } from "../../utils/styleTheme";
import ErrorPage from "../Commons/ErrorPage";
import NoItems from "../Commons/NoItems";
import { Link } from 'react-router-dom';
import Skeleton from "../Commons/Skeleton";
import { getOrderList } from "../../api";

export default function OrderItems(props) {
    //const [onLoading, setOnLoading] = useState(false);
    //const userInfo = useSelector((state) => state.user);
    const getDataList = getOrderList();
    console.log("list", getOrderList)
    //const [editProduct, setEditProduct] = useState(null);
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
      <span>order</span>
    );
  }
  

  
