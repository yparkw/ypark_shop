/* eslint-disable react/prop-types */
import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

export default memo(function SizeSelector(props) {
  const sizeArray = Object.keys(props.sizes).map((key) => {
    return { size: key, quantity: props.sizes[key] };
  });

  console.log("sizeSelector", props)

  const [selectItem, setSelectItem] = useState(null);
  
  useEffect(() => {
    if (selectItem !== null) {
      
      const maxQuantity = sizeArray.find(sizeObj => sizeObj.size === selectItem).quantity;
      if(maxQuantity !== undefined){
        props.setSize(selectItem);
        props.setMaxQuantity(maxQuantity);
      }
      
    }
  }, [selectItem, props]);


  const settings = {
    focusOnSelect: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    infinite: false,
    centerMode: true,
  };

  const slideItemClickHandler = (value) => {
    const selectedSize = sizeArray.find(sizeObj => sizeObj.size === value);
    if (selectedSize && selectedSize.quantity > 0) {
        setSelectItem(value);
        props.setMaxQuantity(selectedSize.quantity);
    }
    
  };

  
  return (
    <Container>
      {selectItem === null && <Prompt>사이즈를 선택해 주세요</Prompt>}
      <IoMdArrowDropleft />
      <SliderWrapper arrows={false} {...settings}>
        {sizeArray.map((v) => {
          return (
            <div key={v.size}>
              <SlideItem
                selected={selectItem === v.size}
                quantity={v.quantity}
                onClick={() => slideItemClickHandler(v.size)}
              >
                {v.size} {v.quantity === 0 ? '품절' : `(${v.quantity})`}
              </SlideItem>
            </div>
          );
        })}
      </SliderWrapper>
      <IoMdArrowDropright />
    </Container>
  );
});

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
    fill: #49474c;
  }
`;

const SliderWrapper = styled(Slider)`
  width: 300px;

  .slick-arrow .slick-next {
    display: none;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SlideItem = styled.button`
  width: 50px;
  background-color: ${(props) => props.selected && "black"};
  border: none;
  background-color: transparent;
  font-size: 1rem;
  color: ${(props) => (props.quantity === 0 ? "#bcbcbc" : "#49474c")};
  pointer-events: ${(props) => (props.quantity === 0 ? "none" : "auto")};

  ${(props) =>
    props.selected &&
    css`
      color: #2d7df4;
      font-size: 18px;
      font-weight: 700;
    `}
`;

const Prompt = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
  font-size: 20px;
  color: #49474c;
`;