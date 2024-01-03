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
    title: "",
    price: "",
    stock: 0,
    category: "",
    images: "", 
    size: "",
  });

  const [images, setImages] = useState([]);
  const [contentImg, setContentImg] = useState([]);
  const [isValid, setIsValid] = useState(false);

  const postRegister = useProductRegister({
    ...inputs,
    // images: images,
    // content_images: contentImg,
  });

  useEffect(() => {
    let valid = true;
    for (let i in inputs) {
      if (i === "stock") {
        if (typeof inputs[i] !== "number" || inputs[i] < 0) {
          valid = false;
          break;
        }
      } else if (!inputs[i]) {
        valid = false;
        break;
      }
    }
  
    setIsValid(valid);
  }, [inputs]);

  const handlerImageChange = (e) => {
    const files = e.target.files;

    if(files && files[0]){
      setInputs({ ...inputs, images: files[0]})
    }
  }

  const inputChangeHandler = (e) => {
    if (e.target.name === "price") {
      setInputs({ ...inputs, [e.target.name]: Number(e.target.value) });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
  };

  
  const postRegisterHandler = (e) => {
    e.preventDefault();

    const formData = new FormData()
    for (const key in inputs) {
      if (key !== "images") {  // 이미지 필드 제외
        formData.append(key, inputs[key]);
      }
    }

    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });


    postRegister.mutate(formData);
  };

  if (postRegister.isSuccess) {
    console.log("register success");
  }

  return (
    <Container>
      <InputWrapper>
        <InputText
          name={"title"}
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
        {/* <ColorSelector
          require={true}
          colorList={dummyColor}
          name={"color"}
          changeHandler={inputChangeHandler}
        /> */}
        <CheckBoxSelector />
        <input
          type="file"
          name="images"
          onChange={handlerImageChange}
        />
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
  grid-column: span 2;
  grid-column-start: 2;
  grid-column-end: 2;
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
