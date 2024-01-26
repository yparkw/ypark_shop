/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const dummySize = ["S", "M", "L", "XL", "Free"];

export default function CheckBoxSelector(props) {
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleSizeChange = (event) => {
    const size = event.target.id;
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  useEffect(() => {
    // 상위 컴포넌트에 선택된 사이즈 전달
    props.onChange(selectedSizes);
  }, [selectedSizes]);

  return (
    <Container>
      <span>Size</span>
      <SubContainer>
        {dummySize.map((v, i) => {
          return (
            <CheckBoxWrapper key={i}>
              <input type={"checkbox"} id={v} onChange={handleSizeChange} />
              <Label htmlFor={v}>{v}</Label>
            </CheckBoxWrapper>
          );
        })}
      </SubContainer>
    </Container>
  );
}

const Container = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  span {
    font-size: 1rem;
    font-weight: 700;

    &::after {
      color: #ff5252;
      content: " *";
    }
  }
`;

const Label = styled.label`
  width: max-content;
`;

const CheckBoxWrapper = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    width: 1rem;
    height: 1rem;
  }
`;

const SubContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
