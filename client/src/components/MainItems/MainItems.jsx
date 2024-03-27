/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useGetProductItems from "../../hooks/useGetProductItems";
import { desktop, mobile, tablet } from "../../utils/styleTheme";
import ErrorPage from "../Commons/ErrorPage";
import ItemCard from "./ItemCard";
import NoItems from "../Commons/NoItems";
import Skeleton from "../Commons/Skeleton";

function MainItems(props) {
  const [onLoading, setOnLoading] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const getDataList = useGetProductItems(props.params, setOnLoading);

  // const filteredData = getDataList.isSuccess && Array.isArray(getDataList.data?.data) ? 
  // getDataList.data.data.filter(item => props.params.category === '' || item.category === props.params.category.value) : [];
  // // 카테고리 선택 핸들러
  console.log("getDataList", getDataList);
  const nextButtonClickHandler = () => {
    const nextPageNumber = getDataList.data.page_data.next ? new URL(getDataList.data.page_data.next).searchParams.get('page') : null;
    if (nextPageNumber) props.setPage(parseInt(nextPageNumber));
  };
  
  const prevButtonClickHandler = () => {
    const prevPageNumber = getDataList.data.page_data.previous ? new URL(getDataList.data.page_data.previous).searchParams.get('page') : null;
    if (prevPageNumber) props.setPage(parseInt(prevPageNumber));
  };

  const showPrevButton = getDataList.data.page_data.previous !== null;
  const showNextButton = getDataList.data.page_data.next !== null;
  // const showPrevButton = getDataList.page_data.previous !== null;
  // const showNextButton = getDataList.page_data.next !== null;
  if (getDataList.isLoading || onLoading) {
    return (
      <Container mode={props.mode}>
        <Skeleton size={9} />
      </Container>
    );
  }

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

  const isSoldOut = (sizes) => {
    const total = Object.values(sizes).reduce((acc, curr) => acc + curr, 0);
    return total === 0;
  };

  
  

  return (
    <>
      <Container mode={props.mode}>
              {props.items?.data.map((datas) => (
                <ItemCard
                  key={datas.id}
                  id={datas.id}
                  productImg={datas.image_url}
                  title={datas.name}
                  price={datas.price}
                  sizes={datas.size}
                  isSoldOut={isSoldOut(datas.sizes)}
                />
              ))}
      </Container>
      <ButtonWrapper>
        <div>
          {showPrevButton && (
            <button className="button__prev" onClick={prevButtonClickHandler}>
              <MdArrowBackIosNew />
              <span>Prev</span>
            </button>
          )}
        </div>
        <div>
          {showNextButton && (
            <button className="button__next" onClick={nextButtonClickHandler}>
              <span>Next</span>
              <MdArrowForwardIos />
            </button>
          )}
        </div>
      </ButtonWrapper>
    </>
  );
}

const Container = styled.section`
  margin-top: 48px;
  display: grid;
  grid-template-columns: ${(props) =>
    props.mode === "main" ? "repeat(4, 1fr)" : "repeat(3, 1fr)"};
  grid-column-gap: 40px;
  grid-row-gap: 64px;
  width: 100%;
  max-width: 1280px;

  @media ${desktop} {
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
    grid-column-gap: 28px;
    grid-row-gap: 56px;
  }

  @media ${tablet} {
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
    grid-column-gap: 16px;
    grid-row-gap: 32px;
  }

  @media ${mobile} {
    grid-template-columns: 1fr;
    place-items: center;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 2rem;

  div {
    flex: 1;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #cdcdcd;
    background-color: transparent;
    border-radius: 10px;
    padding: 8px;
    width: 100%;
    max-width: 180px;
    font-size: 1rem;
    color: #2d7df4;
    gap: 8px;
    transition: 0.5s;

    svg {
      width: 34px;
      height: 34px;
      fill: #2d7df4;
    }

    &:hover {
      background-color: #2d7df4;
      color: white;
      border: 2px solid #2d7df4;
      svg {
        fill: white;
      }
    }
  }

  .button__prev {
    padding-right: 2rem;
  }

  .button__next {
    padding-left: 2rem;
  }
`;

export default MainItems;
