/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainItems from "../components/MainItems/MainItems";
import SubBanner from "../components/SubBanner/Subbanner";
import useGetProductItems from "../hooks/useGetProductItems";

export default function ShopPage() {
  const [params, setParams] = useState({
    page: 1,
    pageSize: 9,
  });

  const [changeList, setChangeList] = useState(false);

  const { data, isLoading, isSuccess, isError, refetch } = useGetProductItems(params, setChangeList);

  useEffect(() => {
    refetch();
  }, [params.page, refetch]);

  
  console.log("shopPage", data)
  return (
    <Container>
      <SubBanner
        imgUrl={`${process.env.PUBLIC_URL}/assets/images/main_banner_1920x460.png`}
      />
      <ShopWrapper>
        {/* <ShopFilter  setParams={setParams}/> */}
        <ItemsWrapper>
          <MainItems
            setParams={setParams}
            data={data}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            mode={"shop"}
            changeList={changeList}
            params={params}
            
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
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
  width: 100%;
  max-width: 1280px;
`;

const ItemsWrapper = styled.div`
  grid-column-start: 2;
  grid-column-end: 5;
`;
