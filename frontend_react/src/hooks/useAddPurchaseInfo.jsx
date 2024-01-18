import Cookie from "js-cookie";
// import { useMutation } from "react-query";
import { axiosInstance } from "../api/axiosInstance";


export const useAddPurchaseInfo = async (formData) => {
    const token = Cookie.get("access"); // 토큰 가져오기
    const res = axiosInstance.post("/api/purchase/", formData,{
      headers: {
        Authorization: `Bearer ${token}`, // 토큰 헤더에 추가
      }
    }
    );
    return res;
  };