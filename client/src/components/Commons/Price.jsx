/* eslint-disable react/prop-types */
import React from "react";

export default function Price(props) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  }
  
  const priceRegex = formatPrice(props.price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return <span>{priceRegex} </span>;
}
