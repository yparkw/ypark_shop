/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../api/axiosInstance";
import { setUser } from "../redux/reducer/userSlice";

const loginFn = async (payload) => {
  const res = await axiosInstance.post("api/user/login/", payload, {withCredentials: false});
  if (res?.headers) {
    Cookies.set("access", res.data.access);
  }

  return res;
};

export default function useLoginMutation(value) {
  const dispatch = useDispatch();

  const { mutate, isError, isLoading, isSuccess } = useMutation(
    () => loginFn(value),
    {
      retry: 2,
      onSuccess: (res) =>
      {
        dispatch(
          setUser({
            id: res.data.id,
            name: res.data.username,
            email: res.data.email,
            phone: res.data.phone,
            address: res.data.address,
            detailAddress: res.data.detailAddress,
            postCode: res.data.postCode,
            is_active: res.data.is_active,
            is_admin: res.data.is_admin,
            is_staff: res.data.is_staff,
            isLogin: true,
          })
        );
      },
    }
  );

  return { mutate, isError, isLoading, isSuccess };
}
