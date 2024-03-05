import Cookie from "js-cookie";
import { axiosInstance } from "./axiosInstance";

export const authorizeToken = async () => {
  const token = Cookie.get("authoization"); // JWT 토큰을 쿠키에서 가져옵니다.
  const res = await axiosInstance.get("/api/user/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const productImageRegisterFn = async (formData) => {
  const token = Cookie.get("access"); // 토큰 가져오기
  const res = axiosInstance.post("/api/products/upload/", formData,{
    headers: {
      Authorization: `Bearer ${token}`, // 토큰 헤더에 추가
      "Content-type" : "multipart/form-data"
    }
  }
  );
  return res;
};


export const productRegisterFn = async (formData) => {
  const token = Cookie.get("access"); // 토큰 가져오기
  const res = await axiosInstance.post("/api/products/", formData, {
    headers: {
      Authorization: `Bearer ${token}`, // 토큰 헤더에 추가
    }
  });
  return res;
};

export const productUpdateFn = async (formData) => {
  const token = Cookie.get("access");
  const res = await axiosInstance.patch(`/api/products/${formData.id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`, // 토큰 헤더에 추가
    }
  });
  return res;
};

export const getCartData = async () => {
  const token = Cookie.get("access");
  const res = await axiosInstance.get("/api/cart/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("getCartData: ", res.data)
  return res.data;
};

export const deleteFavoriteItem = async (id) => {
  const token = Cookie.get("access");
  const res = await axiosInstance.delete(`/api/v1/bookmarks/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const getOrderList = async () => {
  const token = Cookie.get("access");
  const res = await axiosInstance.get("/api/purchase", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const patchUserInfo = async (body, id) => {
  const token = Cookie.get("access");
  const res = await axiosInstance.patch(`/api/v1/members/${id}`, body, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const getUserData = async (id) => {
  const token = Cookie.get("access");
  const res = await axiosInstance.get(`/api/v1/members/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};