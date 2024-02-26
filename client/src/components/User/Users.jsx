import React from "react";
// import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
// import { useSelector  } from "react-redux";
import styled from "styled-components";
import useGetUsers from "../../hooks/useGetUsers";
// import { desktop, mobile, tablet } from "../../utils/styleTheme";
import ErrorPage from "../Commons/ErrorPage";
import UserInfoCard from "./UserInfoCard";
import NoItems from "../Commons/NoItems";
// import { Link } from 'react-router-dom';
// import Skeleton from "../Commons/Skeleton";

function Users() {
//   const [onLoading, setOnLoading] = useState(false);
//   const userInfo = useSelector((state) => state.user);
  const getUserList = useGetUsers();
  const { data, refetch } = getUserList;
//   const [editProduct, setEditProduct] = useState(null);

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

// const StyledLink = styled(Link)`
//   padding: 8px 16px; // 링크 주변에 패딩을 추가합니다.
//   border: 1px solid #49474c; // 테두리 색상을 지정합니다.
//   border-radius: 4px; // 테두리에 둥근 모서리를 추가합니다.
//   align-self: flex-end;
//   margin-bottom: 20px;
//   // 나머지 스타일링
// `;
export default Users;
