/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
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
  // const userInfo = useSelector((state) => state.user);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 9,
  });
  const {data, isLoading, isSuccess, isError, refetch} = useGetProductItems(params, setOnLoading);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    refetch();
  }, [params.page, refetch]);

  console.log("AdminItems", data);
  
  if (isLoading) {
    return (
      <Container mode={props.mode}>
        <Skeleton size={9} />
      </Container>
    );
  }
  
  if (isSuccess && Array.isArray(data.data) && !data.data.length) {
    return <NoItems />;
  }

  if (isError) {
    return (
      <ErrorPage
        errorText={"Network Error"}
        retryAction={refetch}
      />
    );
  }


  const nextButtonClickHandler = () => {
    const nextPageUrl = new URL(data.page_data.next);
    const nextPageNumber = nextPageUrl.searchParams.get('page')
    if (nextPageNumber) {
      setParams(prevParams => ({ ...prevParams, page: parseInt(nextPageNumber, 10) }));
    }
  };
  
  const prevButtonClickHandler = () => {
    const previousPageUrl = new URL(data.page_data.previous);
    const prevPageNumber = previousPageUrl.searchParams.get('page');
    if (prevPageNumber) {
      setParams(prevParams => ({ ...prevParams, page: parseInt(prevPageNumber, 10) }));
    }
  };

  const showPrevButton = data.page_data.previous !== null;
  const showNextButton = data.page_data.next !== null;



  return (
    <>
      <Container>
        <StyledLink to="/product-register">상품등록</StyledLink>
        <hr></hr>
        {isSuccess  &&  Array.isArray(data.data) &&
          data.data.map((datas) => {
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
      <ButtonWrapper>
        <div className = "button-container">
          {showPrevButton && (
            <button className="button__prev" onClick={prevButtonClickHandler}>
              <MdArrowBackIosNew />
              <span>Prev</span>
            </button>
          )}
        </div>
        <div className = "button-container">
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


const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column; // Changed to column for vertical stacking
  align-items: center; // Center the buttons vertically
  gap: 1rem; // Adjust gap as needed

  .button-container {
    width: 100%;
    display: flex;
    justify-content: center; // Center the buttons horizontally
  }
  
  .button__prev, .button__next {
    width: auto; // Or set a specific width, but ensure it's not 'none'
    margin: 0 auto; // Center the buttons in the button container
  }
  // Further styles for buttons as needed
`;
export default AdminItems;
