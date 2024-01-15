import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../api/axiosInstance";

const deleteCartItem = async (id) => {
  const token = Cookies.get("access");
  const res = await axiosInstance.delete(`/api/cart/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export default function useDeleteCartData(id, setFunction) {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess } = useMutation(
    () => deleteCartItem(id),
    {
      retry: false,
      onSuccess: () => {
        queryClient.refetchQueries(["getCartData"]);
        setFunction(0);
      },
    }
  );

  return { mutate, isLoading, isSuccess };
}
