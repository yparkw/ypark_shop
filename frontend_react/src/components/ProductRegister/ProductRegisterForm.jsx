/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import useProductRegister from "../../hooks/useProductRegister";
import Button from "../Commons/Button";
import CheckBoxSelector from "./CheckBoxSelector";
import ImageSelector from "./ImageSelector";
import InputSelect from "./InputSelect";
import InputText from "./InputText";

export default function ProductRegisterForm() {
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    category: "",
    sizes: { 'S': 0, 'M': 0, 'L': 0, 'XL': 0, 'FREE': 0 },
  });

  const [thumbImage, setThumbImage] = useState(null);
  // const [contentImg, setContentImg] = useState([]);
  const [isValid, setIsValid] = useState(false);

  

  const inputChangeHandler = (e) => {
    const {name, value} = e.target;
    const newValue = (name === 'price') ? Number(value) : value;
    setInputs({...inputs, [name]: newValue});
  };

  const handleSizeQuantityChange = (size, value) => {

    const count = value === '' ? 0 : Number(value);
    setInputs(prevInputs => ({
      ...prevInputs,
      sizes: {
        ...prevInputs.sizes,
        [size]: count
      }
    }));
  };

  const {postProduct} = useProductRegister();
  
  useEffect(() => {
    let valid = true;
    for (let i in inputs) {
      if (!inputs[i]) {
        valid = false;
        break;
      }
    }
    if (!thumbImage) {
      valid = false;
    }
    setIsValid(valid);
  }, [inputs, thumbImage]);

  const navigate = useNavigate();

  const postRegisterHandler = async(e) => {
    e.preventDefault();
    

    const sizesArray = Object.entries(inputs.sizes).map(([size, count]) => {
      return { size, count };
    });

    const requestData = {
      ...inputs,
      sizes: sizesArray
    };

    console.log('Sending:', requestData, thumbImage);
    if (isValid) {
      const result = await postProduct(requestData, thumbImage);
      console.log('Result:', result);
      if (result) {
        console.log('register success');
        navigate('/');
      } else {
        console.log('register failed');
      }
    }
  };


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
        {/* <InputText
          name={"stock"}
          label={"Quantity"}
          text={"Input Quantity"}
          require={true}
          mode={"title"}
          type={"text"}
          changeHandler={inputChangeHandler}
        /> */}
        <CategoryBox>
          <InputSelect
            name="category"
            label={"Category"}
            text={"Category"}
            require={true}
            changeHandler={inputChangeHandler}
          />
        </CategoryBox>
        <SizeQuantityInputWrapper>
          {Object.entries(inputs.sizes).map(([size, count]) => (
            <SizeQuantityInput key ={size}>
              <SizeLabel>{size}</SizeLabel>
              <SizeInput
                type={"number"}
                value={count}
                onFocus={(e) => e.target.value === 0 ? e.target.select() : null}
                onChange={(e) => handleSizeQuantityChange(size, Number(e.target.value))}
                onBlur = {(e) => {
                  if (e.target.value === ''){
                    handleSizeQuantityChange(size, 0);
                  }
                }

                }
              />
            </SizeQuantityInput>
          ))}
        </SizeQuantityInputWrapper>
        <ImageSelector
          buttonText={"Select Thumbnail"}
          label={"Thumbnail"}
          name="thumb_images"
          changeHandler={setThumbImage}
        />
        
        
        {/* <CheckBoxSelector onChange={handleSizeChange} /> */}
        
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
        <Button disable={isValid} onClick={postRegisterHandler}>
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
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;
  display: flex;
  gap: 40px;
  justify-content: space-between;
  align-items: center;
`;

const SizeQuantityInputWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  display: flex;
  justify-content: space-between;
`;

const SizeQuantityInput = styled.div`
  display: flex;
  align-items: center;
`;

const SizeLabel = styled.label`
  margin-right: 10px;
`;

const SizeInput = styled.input`
  width: 60px;
`;


const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;