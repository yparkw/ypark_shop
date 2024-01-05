import Cookie from "js-cookie";
import { axiosInstance } from "./axiosInstance";

export const authorizeToken = async () => {
  const token = Cookie.get("authorization");
  const res = await axiosInstance.get("/api/user", {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const productImageRegisterFn = async (formData) => {
  const res = axiosInstance.post("/api/products/upload/", formData,{
    withCredentials: false,
    headers: {
      "Content-type" : "multipart/form-data"
    }
  }
  );
  return res;
};


export const productRegisterFn = async (formData) => {
  const res = await axiosInstance.post("/api/products/", formData, {
    withCredentials: false,
  });
  return res;
};

export const getCartData = async () => {
  const token = Cookie.get("authorization");
  const res = await axiosInstance.get("/api/carts/", {
    headers: {
      Authorization: token,
    },
  });

  return res.data.data;
};

export const deleteFavoriteItem = async (id) => {
  const token = Cookie.get("authorization");
  const res = await axiosInstance.delete(`/api/v1/bookmarks/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const getOrderList = async () => {
  const token = Cookie.get("authorization");
  const res = await axiosInstance.get("/api/v2/orders/info", {
    headers: {
      Authorization: token,
    },
  });
  return res.data.data;
};

export const patchUserInfo = async (body, id) => {
  const token = Cookie.get("authorization");
  const res = await axiosInstance.patch(`/api/v1/members/${id}`, body, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const getUserData = async (id) => {
  const token = Cookie.get("authorization");
  const res = await axiosInstance.get(`/api/v1/members/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};