/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { memo } from "react";
import styled from "styled-components";
import ImageUploader from "react-images-upload";
import { useMutation } from "react-query";
import { productImageRegisterFn } from "../../api";
import { useEffect } from "react";

export default memo(function ImageSelector(props) {
  const imageChangeHandler = (files) => {
    // 파일이 선택되었을 때의 로직
    if (files.length > 0) {
      const selectedImage = files[0];
      props.changeHandler(selectedImage); // 상위 컴포넌트로 선택된 이미지 전달
    }
  };

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