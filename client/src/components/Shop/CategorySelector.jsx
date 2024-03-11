/* eslint-disable react/prop-types */

import React, { memo } from "react";
import styled, { css } from "styled-components";
import { categoryList } from "../../constance";

export default memo(function CategorySelector({setParams}) {
  // const [isClick, setIsClick] = useState(false);


  const categoryClickHandler = (category) => {
    setParams((prevParams) => ({
      ...prevParams,
      // 카테고리 값을 단순 문자열로 설정
      category: category,
    }));
  };
  
  return (
    <Container>
      <p>Category</p>
      <CategoryWrapper>
        {categoryList.map((v) => (
          <li key={v.id} onClick={() => categoryClickHandler(category)}>
            <MainCategory active={v.mainCategory === isClick}>
              {v.mainCategory}
            </MainCategory>
          </li>
        ))}
      </CategoryWrapper>
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  p {
    font-size: 20px;
    font-weight: 800;
  }
`;

const CategoryWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MainCategory = styled.button`
  border: none;
  width: 100%;
  background-color: transparent;
  font-size: 18px;
  color: black;
  text-align: left;
  position: relative;
  padding: 8px;
  border-radius: 8px;

  &:hover {
    background-color: #2d7df4;
    color: white;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: #2d7df4;
      color: white;
    `}
`;
