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
  
  // const filteredData = data.isSuccess && Array.isArray(data.data?.data) ? 
  // data.data.data.filter(item => props.params.category === '' || item.category === props.params.category.value) : [];
  // // 카테고리 선택 핸들러
  const { setParams, data, isLoading, isSuccess, isError, mode } = props;
  
  if (isLoading) {
    return (
      <Container mode={props.mode}>
        <Skeleton size={9} />
      </Container>
    );
  }

  if (isSuccess && Array.isArray(data.data.data) && !data.data.data.length) {
    return <NoItems />;
  }

  if (isError) {
    return (
      <ErrorPage
        errorText={"Network Error"}
        retryAction={data.refetch}
      />
    );
  }

  const nextButtonClickHandler = () => {
    const nextPageUrl = new URL(data.page_data.next);
    const nextPageNumber = nextPageUrl.searchParams.get('page')
    if (nextPageNumber) {
      props.setParams(prevParams => ({ ...prevParams, page: parseInt(nextPageNumber, 10) }));
    }
  };
  
  const prevButtonClickHandler = () => {
    const previousPageUrl = new URL(data.page_data.previous);
    const prevPageNumber = previousPageUrl.searchParams.get('page');
    if (prevPageNumber) {
      props.setParams(prevParams => ({ ...prevParams, page: parseInt(prevPageNumber, 10) }));
    }
  };

  const showPrevButton = data.page_data.previous !== null;
  const showNextButton = data.page_data.next !== null;

  const isSoldOut = (sizes) => {
    const total = Object.values(sizes).reduce((acc, curr) => acc + curr, 0);
    return total === 0;
  };

  
  

  return (
    <>
      <Container mode={props.mode}>
              {data?.data.map((datas) => (
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

  .button-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .button__prev {
    max_width: none;
    // padding-right: 2rem;
  }

  .button__next {
    max_width: none;
    // padding-left: 2rem;
  }
`;

export default MainItems;
