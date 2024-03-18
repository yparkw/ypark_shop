/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { FaWonSign } from "react-icons/fa";
import Button from "../Commons/Button";
import Price from "../Commons/Price";
import useGetCartDataQuery from "../../hooks/useGetCartDataQuery";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useOrderCartItems from "../../hooks/useOrderCartItems";
import ErrorPage from "../Commons/ErrorPage";
import CartItemSkeleton from "./CartItemSkeleton";
import NoItems from "../Commons/NoItems";

export default memo(function CartForm() {
  const [totalPrice, setTotalPrice] = useState({});
  const [calcPrice, setCalcPrice] = useState(0);
  const [paymentData, setPaymentData] = useState({});
  const [onLoading, setOnLoading] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const getCartData = useGetCartDataQuery(setOnLoading);
  const orderCartAction = useOrderCartItems(
    paymentData,
    getCartData.data,
    "cart"
  );



  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    // 상품 정보가 로딩되면 모든 상품을 선택하지 않은 상태로 초기화합니다.
    if (getCartData?.data?.items) {
      setSelectedItems(getCartData.data.items.reduce((acc, item) => {
        acc[item.cart] = false;
        return acc;
      }, {}));
    }
  }, [getCartData.data]);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(Object.keys(selectedItems).reduce((acc, key) => {
      acc[key] = !selectAll;
      return acc;
    }, {}));
  };
  
  const toggleSelectItem = (id) => {
    setSelectedItems({
      ...selectedItems,
      [id]: !selectedItems[id],
    });
  };
  
  useEffect(() => {
    if (getCartData?.data?.items) {
      const totalPriceCalc = getCartData.data.items
      .filter(item => selectedItems[item.id])
      .reduce(
        (acc, item) => acc + parseFloat(item.productItemId.price) * item.quantity,
        0
      );
      setCalcPrice(totalPriceCalc);
    } else {
      setCalcPrice(0);
    }
  }, [getCartData.data, selectedItems]);
  

  useEffect(() => {
    setPaymentData({
      pg: "kakaopay",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      name: "stateMall-payment",
      amount: calcPrice,
      buyer_email: userInfo.email,
      buyer_name: userInfo.name,
      buyer_tel: userInfo.phone,
      buyer_addr: userInfo.address,
      buyer_postcode: userInfo.postcode,
    });
  }, [totalPrice, calcPrice, userInfo]);


  useEffect(() => {
    // totalPrice에서 각 항목의 가격을 합산하여 calcPrice를 업데이트합니다.
    const totalPriceCalc = Object.values(totalPrice).reduce((acc, price) => acc + price, 0);
    setCalcPrice(totalPriceCalc);
  }, [totalPrice]);

  const navigate = useNavigate();

  const clickHander = () => {
    const selectedCartItems = getCartData.data.items
    .filter(item => selectedItems[item.id])
    .map(item => ({
      name: item.productItemId.name,
      price: item.productItemId.price,
      quantity: totalPrice[item.cart] / parseFloat(item.productItemId.price),
      size: item.size,
    }));

    navigate("/purchase", { state: { orderInfo: selectedCartItems }})
  };


  
  

  if (getCartData.isLoading || onLoading) {
    // 로딩 상태를 렌더링합니다. 예를 들어 스피너나 스켈레톤 컴포넌트가 될 수 있습니다.
    return <span>로딩중</span>;  // 실제 로딩 컴포넌트로 교체하세요.
  }
  if (getCartData.isError) {
    return (
      <ErrorPage
        errorText={"Network Error"}
        retryAction={getCartData.refetch}
      />
    );
  }

  if (getCartData?.data?.length === 0) {
    return <NoItems shopLink={true} />;
  }

  const renderCartItemCheckbox = (id) => {
    return (
      <input
        type="checkbox"
        checked={selectedItems[id] || false}
        onChange={() => toggleSelectItem(id)}
      />
    );
  };
  
  // 전체 선택 체크박스 렌더링
  const renderSelectAllCheckbox = () => {
    return (
      <input
        type="checkbox"
        checked={selectAll}
        onChange={toggleSelectAll}
      />
    );
  };


  const renderCartItems = () => {
    return getCartData.data.items.map((v) => (
      <CartItemWrapper key = {v.cart}>
        <input
          type="checkbox"
          checked={selectedItems[v.id] || false}
          onChange={() => toggleSelectItem(v.id)}
        />
        <CartItem
            id={v.id}
            itemImg={v.productItemId.image_url}
            price={v.productItemId.price}
            quantity={v.quantity}
            itemTitle={v.productItemId.name}
            size={v.size}
            setTotalPrice={setTotalPrice}
            cartId={v.cart}
            sizesWithCount = {v.productItemId.sizes_with_count}
            checkbox={renderCartItemCheckbox(v.cart)} // 각 상품별 체크박스 추가
          />
      </CartItemWrapper>
    ));
  };

  return (
    <Container>
      <FormHeader>
        {renderSelectAllCheckbox()} {/* 전체 선택 체크박스 추가 */}
        <MenuBox>PRODUCT NAME</MenuBox>
        <MenuBox>OPTION</MenuBox>
        <MenuBox>TOTAL</MenuBox>
      </FormHeader>
      <FormBody>
        {renderCartItems()}
      </FormBody>
      <FormFooter>
        <SubTotal>
          <span>합계: </span>
          <span>
            <FaWonSign />
            <Price price={calcPrice} />
          </span>
        </SubTotal>
      </FormFooter>
      <Button disable={!getCartData?.data?.length} onClick={clickHander}>
        ORDER NOW
      </Button>
    </Container>
  );
});

const Container = styled.section`
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-top: 64px;
`;

const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  /* 필요한 추가 스타일 */
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
  font-size: 18px;
  font-weight: 600;

  &:nth-child(1) {
    flex: 2;
  }

  &:last-child {
    flex: 0.8;
  }
`;

const FormBody = styled.section`
  // display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

const FormFooter = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #d4d4d4;
  margin-bottom: 40px;

  button {
    display: flex;
    align-items: center;
    border: none;
    background-color: transparent;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const SubTotal = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 14px;
    font-weight: 600;
    color: #525252;

    &:last-child {
      font-size: 20px;
      font-weight: 600;
    }

    svg {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  }
`;
