/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../api/axiosInstance";
import { defaultUser } from "../constance/bannerImage";
import { setUser } from "../redux/reducer/userSlice";

const loginFn = async (payload) => {
  const res = await axiosInstance.post("api/user/login/", payload, {withCredentials: false});
  if (res?.headers) {
    Cookies.set("authorization", res.data.access);
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
      {console.log('Server response:', res);
        dispatch(
          setUser({
            id: res.data.id,
            name: res.data.username,
            email: res.data.email,
            phone: res.data.phone,
            address: res.data.address,
            postcode: res.data.postcode,
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
