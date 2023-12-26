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
    Cookies.set("authorization", res.headers["authorization"]);
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
        dispatch(
          setUser({
            // id: res.data.data.id,
            // name: res.data.data.name,
            // email: res.data.data.email,
            // phone: res.data.data.phone,
            // address: res.data.data.address,
            // postcode: res.data.data.postcode,
            isLogin: true,
          })
        ),
    }
  );

  return { mutate, isError, isLoading, isSuccess };
}
