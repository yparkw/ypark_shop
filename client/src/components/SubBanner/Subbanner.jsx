/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { tablet } from "../../utils/styleTheme";

// eslint-disable-next-line
function SubBanner(props) {
  return (
    <Container>
      <div>
        <img src={props.imgUrl}></img>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 50%;
  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    min-height: 280px;
  }

  @media ${tablet} {
    display: none;
  }
`;

export default SubBanner;
