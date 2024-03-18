import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { getCartData } from "../api";
import { addCartData } from "../redux/reducer/cartSlice";
// import React from "react";

export default function useGetCartDataQuery(setFunction) {
  const dispatch = useDispatch();
  
  const { data, isLoading, isError, refetch, isSuccess } = useQuery(
    ["getCartData"],
    getCartData,
    {
      retry: 2,
      onSuccess: (response) => {
        dispatch(addCartData(response.items));
        setFunction(true);
        setTimeout(() => {
          setFunction(false);
        }, 1200);
      },
    }
  );
  console.log("useGetDataQuery", data)

  return { data, isLoading, isError, refetch, isSuccess };
}
