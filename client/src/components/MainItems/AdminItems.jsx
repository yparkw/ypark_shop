/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useSelector  } from "react-redux";
import styled from "styled-components";
import useGetProductItems from "../../hooks/useGetProductItems";
import { desktop, mobile, tablet } from "../../utils/styleTheme";
import ErrorPage from "../Commons/ErrorPage";
import AdminItemCard from "./AdminItemCard";
import NoItems from "../Commons/NoItems";
import { Link } from 'react-router-dom';
import Skeleton from "../Commons/Skeleton";

function AdminItems(props) {
  const [onLoading, setOnLoading] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const getDataList = useGetProductItems(props.params, setOnLoading);
  const [editProduct, setEditProduct] = useState(null);
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
  console.log("adminItem", getDataList.da/a.data )
  return (
    <>
      <Container>
        <StyledLink to="/product-register">상품등록</StyledLink>
        <hr></hr>
        {getDataList.isSuccess && Array.isArray(getDataList.data?.data) &&
          getDataList.data.data.map((datas) => {
            return (
              <AdminItemCard
                key={datas.id}
                id={datas.id}
                productImg={datas.image_url}
                title={datas.name}
                category={datas.category}
                sizes={datas.sizes}
                price={datas.price}
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

const StyledLink = styled(Link)`
  padding: 8px 16px; // 링크 주변에 패딩을 추가합니다.
  border: 1px solid #49474c; // 테두리 색상을 지정합니다.
  border-radius: 4px; // 테두리에 둥근 모서리를 추가합니다.
  align-self: flex-end;
  margin-bottom: 20px;
  // 나머지 스타일링
`;
export default AdminItems;
