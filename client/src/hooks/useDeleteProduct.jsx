import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../api/axiosInstance";

const deleteProductItem= async (id) => {
  const token = Cookies.get("access");
  const res = await axiosInstance.delete(`/api/products/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export default function useDeleteProduct(id, setFunction) {
  const queryClient = useQueryClient();
  console.log("useDeleteProduct am");
  const { mutate, isLoading, isSuccess } = useMutation(
    () => deleteProductItem(id),
    {
      retry: false,
      onSuccess: () => {
        queryClient.refetchQueries(["getProductData"]);
        setFunction(0);
      },
    }
  );

  return { mutate, isLoading, isSuccess };
}
