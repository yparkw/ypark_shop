/* eslint-disable react/prop-types */
import React from 'react';
import styled from "styled-components";
import CartItem from "./CartItem";

const CartProductSelector = ({ items, onToggleItem, setTotalPrice, onToggleAll, selectedItems, selectAll }) => {
    // const handleToggleSelectAll = () => {
    //   onToggleAll();
    // };
  
    // const handleToggleSelectItem = (id) => {
    //   onToggleItem(id);
    // };

    return (
        <>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={onToggleAll}
          />
          {items.map((item) => (
            <CartItemWrapper key={item.cart}>
              <input
                type="checkbox"
                checked={selectedItems[item.id] || false}
                onChange={() => onToggleItem(item.id)}
              />
              {/* Render the CartItem component, passing necessary props */}
              <CartItem
                id={item.id}
                itemImg={item.productItemId.image_url}
                price={item.productItemId.price}
                quantity={item.quantity}
                itemTitle={item.productItemId.name}
                size={item.size}
                setTotalPrice={setTotalPrice}
                cartId={item.cart}
                sizesWithCount={item.productItemId.sizes_with_count}
                // Possibly passing the checkbox as a prop if needed, or manage it inside CartItem
              />
            </CartItemWrapper>
          ))}
        </>
      );
  };
  
  export default CartProductSelector;

  const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  /* 필요한 추가 스타일 */
`;
