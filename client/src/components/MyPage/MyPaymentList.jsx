import React, {useState} from "react";
import styled from "styled-components";
import useGetMyOrder from "../../hooks/useGetMyOrder";
// import Loading from "../Commons/Loading";
import PaymentItem from "./PaymentItem";
import NoItems from "../Commons/NoItems";
import ErrorPage from "../Commons/ErrorPage";
import { useSelector } from "react-redux";

export default function MyPaymentList() {
  const [onLoading, setOnLoading] = useState(false);
  const userInfo = useSelector((state) => state.user);

  const { data, isLoading, isError, refetch } = useGetMyOrder(userInfo.id, "cofirmed", setOnLoading);

  if (!isLoading && !isError && data && Array.isArray(data.data) && !data.data.length) {
    return <NoItems />;
  }

  if (onLoading){
    return "로딩중";
  }

  // if (getOrderList.isLoading) {
  //   return <Loading />;
  // }

  // if (!getOrderList.data) {
  //   return <NoItems shopLink={true} />;
  // }

  if (isError) {
    return (
      <ErrorPage
        errorText={"Network Error"}
        retryAction={refetch}
      />
    );
  }
  return (
    <Container>
      <FormHeader>
        <MenuBox>PRODUCT NAME</MenuBox>
        <MenuBox>ADDRESS</MenuBox>
        <MenuBox>ORDER NUM</MenuBox>
        <MenuBox>PRICE</MenuBox>
      </FormHeader>
      <FormBody>
        {data && Array.isArray(data.data) &&
          data.data.map((v) => {
          return (
            <PaymentItem
              key={v.order_id}
              orderNum={v.merchant_uid}
              products={v.order_products}
              totalPrice={v.total_price}
              address={v.buyer_address}
            />
          );
        })}
      </FormBody>
    </Container>
  );
}

// <Container>
//       <FormHeader>
//         <MenuBox>PRODUCT NAME</MenuBox>
//         <MenuBox>ADDRESS</MenuBox>
//         <MenuBox>ORDER NUM</MenuBox>
//         <MenuBox>PRICE</MenuBox>
//       </FormHeader>
//       <FormBody>
//         {getOrderList?.data.order_response_dto.map((v) => {
//           return (
//             <PaymentItem
//               key={v.order_id}
//               orderNum={v.merchant_uid}
//               products={v.order_products}
//               totalPrice={v.total_price}
//               address={v.buyer_address}
//             />
//           );
//         })}
//       </FormBody>
//     </Container>

const Container = styled.section`
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const FormHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem 0;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d4d4d4;
  font-size: 14px;
`;

const MenuBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:nth-child(1) {
    flex: 2;
  }

  &:nth-child(2) {
    flex: 1;
  }

  &:last-child {
    flex: 0.8;
  }
`;

const FormBody = styled.section`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;
