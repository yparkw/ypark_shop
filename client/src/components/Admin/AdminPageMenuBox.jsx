/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { adminpageMenuList } from "../../constance";
import { useSelector } from "react-redux";

export default function AdminPageMenuBox() {
  const [isClick, setIsClick] = useState(1);
  const userInfo = useSelector((state) => state.user);
  const menuList = adminpageMenuList;

  console.log("user", userInfo)
  return (
    <Container>
      <IconBox>
        {menuList.map((v, i) => {
          if (userInfo.role !== userInfo.is_staff && v.link === "/product-register") {
            return;
          }
          return (
            <WrapperList
              key={v.id}
              active={v.id === isClick ? true : false}
              onClick={() => setIsClick(v.id)}
            >
              <Icons to={v.link}>
                <span>{v.text}</span>
              </Icons>
            </WrapperList>
          );
        })}
      </IconBox>
    </Container>
  );
}

const Container = styled.section`
  background-color: #f6f6f6;
  border-radius: 10px;
  margin-bottom: 32px;
`;

const IconBox = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const WrapperList = styled.li`
  width: 100%;
  transition: 0.5s;
  &:hover {
    background: transparent;
    box-shadow: inset 300px 0 0 0 #87c2f5;
    color: #d8d8d8;
  }

  background-color: ${(props) => (props.active ? "#87c2f5" : "transparent")};
`;

const Icons = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: black;
  padding: 10px 0;

  svg {
    width: 24px;
    height: 24px;
  }

  span {
    font-size: 14px;
  }
`;
