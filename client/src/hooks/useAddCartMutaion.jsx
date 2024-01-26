/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
import { useMutation } from "react-query";
import { axiosInstance } from "../api/axiosInstance";
import { queryClient } from "../utils/queryClient";

const addCartItem = async (body) => {
  const token = Cookies.get("access");
  const res = await axiosInstance.post("/api/cart/", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("addcart", res)
  return res;
};

export default function useAddCartMutaion(body) {
  
  const { mutate, isLoading } = useMutation(() => addCartItem(body), {
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries(["getCartData"]);
    },
  });

  return { mutate, isLoading };
}