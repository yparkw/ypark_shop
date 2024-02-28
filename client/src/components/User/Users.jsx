import React from "react";

import styled from "styled-components";
import useGetUsers from "../../hooks/useGetUsers";
// import { desktop, mobile, tablet } from "../../utils/styleTheme";
import ErrorPage from "../Commons/ErrorPage";
import UserInfoCard from "./UserInfoCard";
import NoItems from "../Commons/NoItems";


function Users() {
  const getUserList = useGetUsers();
  const { data, refetch } = getUserList;

  const handleUserUpdate = () => {
    refetch();
  }

  if (getUserList.isSuccess && Array.isArray(data?.data) && !data.data.length) {
      return <NoItems />;
    }

  if (getUserList.isError) {
    return (
      <ErrorPage
        errorText={"Network Error"}
        retryAction={getUserList.refetch}
      />
    );
  }

  return (
    <>
      <Container>
        <hr></hr>
        {getUserList.isSuccess && Array.isArray(getUserList.data?.data) &&
          getUserList.data.data.map((datas) => {
            return (
              <UserInfoCard
                key={datas.id}
                id={datas.id}
                email={datas.email}
                phone={datas.phone}
                address={datas.address}
                detailAddress={datas.detailAddress}
                is_active = {datas.is_active}
                is_staff = {datas.is_staff}
                is_admin = {datas.is_admin}
                onUserUpdate={handleUserUpdate}
              />
            );
          })}
      </Container>
    </>
  );
}

// 스타일 정의
const Container = styled.section`
  display: flex;
  flex-direction: column;
  // align-items: flex-start;
  padding: 20px;
  width: 100%;
`;

export default Users;
