/* eslint-disable react/prop-types */
import React from 'react';
import styled from "styled-components";
import CartItem from "./CartItem";

const CartProductSelector = ({ items, onToggleItem, setTotalPrice, onToggleAll, selectedItems, selectAll, updateItemQuantity }) => {
    return (
        <>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={onToggleAll}
          />
          {items.map((item) => (
            <CartItemWrapper key={item.id}>
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
                updateItemQuantity={updateItemQuantity}
                // Possibly passing the checkbox as a prop if needed, or manage it inside CartItem
              />
            </CartItemWrapper>
          ))}
        </>
      );
  };
  
const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  /* 필요한 추가 스타일 */
`;

export default CartProductSelector;

  