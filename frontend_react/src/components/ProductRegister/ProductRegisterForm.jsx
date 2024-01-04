/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { brandList } from "../../constance";
import { dummyColor } from "../../constance/index";
import useProductRegister from "../../hooks/useProductRegister";
import Button from "../Commons/Button";
import CheckBoxSelector from "./CheckBoxSelector";
import ColorSelector from "./ColorSelector";
import ImageSelector from "./ImageSelector";
import InputSelect from "./InputSelect";
import InputText from "./InputText";

export default function ProductRegisterForm() {
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    stock: 0,
    category: "",
    // color: "",
    size: "",
  });

  const [thumbImage, setThumbImage] = useState([]);
  // const [contentImg, setContentImg] = useState([]);
  const [isValid, setIsValid] = useState(false);


  useEffect(() => {
    let valid = true;
    for (let i in inputs) {
      if (!inputs[i]) {
        valid = false;
        break;
      }
    }

    if (!thumbImage.length) {
      valid = false;
    }
    setIsValid(valid);
  }, [thumbImage, inputs]);


  const inputChangeHandler = (e) => {
    if (e.target.name === "price") {
      setInputs({ ...inputs, [e.target.name]: Number(e.target.value) });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
  };

  const { postProduct, isProductRegisterSuccess } = useProductRegister();

  const postRegisterHandler = async (e) => {
    e.preventDefault();
    if (isValid) {
      const result = await postProduct(...inputs, thumbImage);
    if (result) {
      console.log('register success');
    } else {
      console.log('register failed');
    }
    }
  };

  useEffect(() => {
    if (isProductRegisterSuccess) {
      console.log('register success');
      // 성공 후 처리 로직
    }
  }, [isProductRegisterSuccess]);

  return (
    <Container>
      <InputWrapper>
        <InputText
          name={"name"}
          label={"Product Name"}
          text={"Input Product Name"}
          require={true}
          mode={"title"}
          type={"text"}
          changeHandler={inputChangeHandler}
        />

        <InputText
          name={"price"}
          label={"Price"}
          text={"Input Price"}
          require={true}
          mode={"price"}
          type={"text"}
          changeHandler={inputChangeHandler}
        />
        <InputText
          name={"stock"}
          label={"Quantity"}
          text={"Input Quantity"}
          require={true}
          mode={"title"}
          type={"text"}
          changeHandler={inputChangeHandler}
        />
        <CategoryBox>
          <InputSelect
            name="category"
            label={"Category"}
            text={"Category"}
            require={true}
            changeHandler={inputChangeHandler}
          />
        </CategoryBox>
        <CheckBoxSelector />
        <ImageSelector
          buttonText={"Select Thumbnail"}
          label={"Thumbnail"}
          name="thumb_images"
          changeHandler={setThumbImage}
        />
        {/* <ColorSelector
          require={true}
          colorList={dummyColor}
          name={"color"}
          changeHandler={inputChangeHandler}
        /> */}
        {/* <ImageSelector
          buttonText={"Select ContentImg"}
          label={"Content Image"}
          name="content_images"
          changeHandler={setContentImg}
        /> */}
      </InputWrapper>
      <SubmitButtonWrapper>
        <Button disable={!isValid} onClick={postRegisterHandler}>
          Register
        </Button>
      </SubmitButtonWrapper>
    </Container>
  );
}

const Container = styled.form`
  margin-top: 60px;
  margin-bottom: 60px;
`;

const InputWrapper = styled.div`
  max-width: 620px;
  min-width: 320px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 32px;
  margin-bottom: 48px;
`;

const CategoryBox = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  width: 100%;
  display: flex;
  gap: 40px;
  justify-content: space-between;
  align-items: center;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;