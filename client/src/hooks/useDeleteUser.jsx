import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../api/axiosInstance";

const deleteUser = async (id) => {
  const token = Cookies.get("access");
  const res = await axiosInstance.delete(`/api/user/update/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export default function useDeleteUserData() {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess } = useMutation(deleteUser, {
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries(["getUsers"]);
      // 필요한 경우 여기에서 추가적인 작업을 수행할 수 있습니다.
    },
  });


  return { mutate, isLoading, isSuccess };
}
