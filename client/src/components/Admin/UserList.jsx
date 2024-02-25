import React from "react";
import styled from "styled-components";
import Users from "../User/Users";


export default function UserList() {
  return (
    <Container>
      <Users/>
    </Container>
  );
}
  
const Container = styled.div`
  display: flex;
  justify-content: flex-end; // 오른쪽 정렬을 위해 flex-end를 사용합니다.
  padding: 1em; // 컨테이너에 약간의 여백을 추가합니다.
`;
