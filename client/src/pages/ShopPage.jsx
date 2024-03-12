/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainItems from "../components/MainItems/MainItems";
import ShopFilter from "../components/Shop/ShopFilter";
import { dummyColor } from "../constance/index";
import SubBanner from "../components/SubBanner/Subbanner";
import useGetProductItems from "../hooks/useGetProductItems";

export default function ShopPage() {
  const [params, setParams] = useState({
    category: "",
    page: 1,
    pageSize: 9,
  });

  const [page, setPage] = useState(1);
  const [changeList, setChangeList] = useState(false);
  const urlParams = {
    page,
    pageSize: 9,
    ...params,
  };

  const { data, isLoading, isSuccess, isError, refetch } = useGetProductItems(params, setChangeList);
  console.log("urlParams", urlParams);

  useEffect(() => {
    if (params.category) {
      setParams((prevParams) => ({ ...prevParams, page: 1 }));
      refetch(); // 카테고리가 변경될 때 목록을 즉시 갱신합니다.
    }
  }, [params.category, refetch]);



  return (
    <Container>
      <SubBanner
        imgUrl={`${process.env.PUBLIC_URL}/assets/images/shop_sub_banner.png`}
      />
      <ShopWrapper>
        <ShopFilter  setParams={setParams}/>
        <ItemsWrapper>
          <MainItems
            setPage={(page) => setParams((prevParams) => ({ ...prevParams, page }))}
            items={data}
            mode={"shop"}
            changeList={changeList}
          />
        </ItemsWrapper>
      </ShopWrapper>
    </Container>
  );
}

const Container = styled.article`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShopWrapper = styled.section`
  margin-top: 64px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  width: 100%;
  max-width: 1280px;
`;

const ItemsWrapper = styled.div`
  grid-column-start: 2;
  grid-column-end: 5;
`;
