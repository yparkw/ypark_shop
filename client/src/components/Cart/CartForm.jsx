/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useGetCartDataQuery from "../../hooks/useGetCartDataQuery";
import Button from "../Commons/Button";
import ErrorPage from "../Commons/ErrorPage";
import NoItems from "../Commons/NoItems";
import CartProductSelector from "./CartProductSelector";


export default memo(function CartForm() {
  const [totalPrice, setTotalPrice] = useState({}); // 상품 합 가격
  // const [calcPrice, setCalcPrice] = useState(0); // 주문가격
  const [onLoading, setOnLoading] = useState(false); // 로딩중
  const [selectedItems, setSelectedItems] = useState({}); // 주문할 상품
  const [selectAll, setSelectAll] = useState(false); // 모두선택 
  const [itemQuantities, setItemQuantities] = useState({});
  // const userInfo = useSelector((state) => state.user);
  const isOrderNowEnabled = Object.values(selectedItems).some(value => value);

  const { data: getCartData, isLoading, isError, refetch, isSuccess } = useGetCartDataQuery(setOnLoading);


  useEffect(() => {
    if (isSuccess && getCartData?.items) {
      setSelectedItems(getCartData.items.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {}));
    }
  }, [getCartData, isSuccess]);


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
  
  const updateItemQuantity = (itemId, quantity) => {
    setItemQuantities(prev => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  useEffect(() => {
    if (isSuccess && getCartData?.items) {
      const initialSelectedItems = getCartData.items.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {});
      setSelectedItems(initialSelectedItems);

      // 초기 calcPrice 설정
      // setCalcPrice(0);
    }
  }, [getCartData, isSuccess]);

  // useEffect(() => {
  //   const totalPriceCalc = Object.values(totalPrice).reduce((acc, price) => acc + price, 0);
  //   setCalcPrice(totalPriceCalc);
  // }, [totalPrice]);


  const navigate = useNavigate();




  const clickHandler = () => {
    const selectedCartItems = getCartData.items
    .filter(item => selectedItems[item.id])
    .map(item => ({
      name: item.productItemId.name,
      price: item.productItemId.price,
      quantity: itemQuantities[item.id] || item.quantity,
      size: item.size,
    }));

    navigate("/purchase", { state: { orderInfo: selectedCartItems }})
  };


  
  if (isLoading || onLoading) {
    return <span>로딩중...</span>;
  } else if (isError) {
      return (
        <ErrorPage
          errorText={"Network Error"}
          retryAction={refetch}
        />
      );
  } else if (isSuccess && (!getCartData || getCartData.items.length === 0)) {
      return <NoItems shopLink={true} />;
  }

  
  return (
    <Container>
      <FormHeader>
        {/* {renderSelectAllCheckbox()} 전체 선택 체크박스 추가 */}
        <MenuBox>상품</MenuBox>
        <MenuBox>옵션</MenuBox>
        <MenuBox>합계</MenuBox>
      </FormHeader>
      <FormBody>
        <CartProductSelector
          items={getCartData.items}
          onToggleItem={toggleSelectItem}
          onToggleAll={toggleSelectAll}
          selectedItems={selectedItems}
          selectAll={selectAll}
          setTotalPrice={setTotalPrice}
          updateItemQuantity={updateItemQuantity}
        />
      </FormBody>
      {/* <FormFooter> */}
        {/* <SubTotal>
          <span>주문 가격: </span>
          <span>
            <FaWonSign />
            <Price price={calcPrice} />
          </span>
        </SubTotal> */}
      {/* </FormFooter> */}
      <Button disable={isOrderNowEnabled} onClick={clickHandler}>
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

// const FormFooter = styled.section`
//   width: 100%;
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   padding: 1rem 0;
//   border-bottom: 1px solid #d4d4d4;
//   margin-bottom: 40px;

//   button {
//     display: flex;
//     align-items: center;
//     border: none;
//     background-color: transparent;

//     svg {
//       width: 16px;
//       height: 16px;
//     }
//   }
// `;

// const SubTotal = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;

//   span {
//     font-size: 14px;
//     font-weight: 600;
//     color: #525252;

//     &:last-child {
//       font-size: 20px;
//       font-weight: 600;
//     }

//     svg {
//       width: 16px;
//       height: 16px;
//       margin-right: 4px;
//     }
//   }
// `;

  // useEffect(() => {
  //   setPaymentData({
  //     pg: "kakaopay",
  //     pay_method: "card",
  //     merchant_uid: `mid_${new Date().getTime()}`,
  //     name: "stateMall-payment",
  //     amount: calcPrice,
  //     buyer_email: userInfo.email,
  //     buyer_name: userInfo.name,
  //     buyer_tel: userInfo.phone,
  //     buyer_addr: userInfo.address,
  //     buyer_postcode: userInfo.postcode,
  //   });
  // }, [totalPrice, calcPrice, userInfo]);