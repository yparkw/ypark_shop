/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { memo } from "react";
import ImageUploader from "react-images-upload";
import styled from "styled-components";

export default memo(function ImageSelector(props) {
  const imageChangeHandler = (files) => {
    // 파일이 선택되었을 때의 로직

    const selectedImage = files;
    props.changeHandler(selectedImage); // 상위 컴포넌트로 선택된 이미지 전달
    
  };

  console.log('imageselector_prop', props)

  return (
    <Container>
      <span>{props.label}</span>
      <InputImage
        imgExtension={[".jpg", ".gif", ".png", ".gif", ".webp", ".jpeg"]}
        maxFileSize={5242880}
        withPreview={true}
        singleImage={true}
        buttonText={props.buttonText}
        label={"Max file size: 5mb"}
        onChange={(e) => imageChangeHandler(e)}
      />
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 100%;

  span {
    font-size: 1rem;
    font-weight: 700;

    &::after {
      color: #ff5252;
      content: " *";
    }
  }
`;

const InputImage = styled(ImageUploader)`
  border: 1px dashed #c8c6c6;
  border-radius: 10px;
  background-color: #f1f1f1;
  div {
    background-color: #f1f1f1;
  }

  button {
    font-size: 12px;
  }
`;