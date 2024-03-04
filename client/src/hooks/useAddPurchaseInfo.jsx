import Cookie from "js-cookie";
import { axiosInstance } from "../api/axiosInstance";
import { useCallback } from 'react';
// import { paymentClickHandler } from "../api/payment";

export const useAddPurchaseInfo = () => {
  const addPurchaseInfo = useCallback(async (formData) => {
    const token = Cookie.get("access"); // 토큰 가져오기
    console.log('formdata', formData)
    try {
      const res = await axiosInstance.post("/api/purchase/verify_purchase", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰 헤더에 추가
        }
      });
      return res.data; // 응답 데이터 반환
    } catch (error) {
      console.error("Purchase verification failed:", error);
      throw error; // 에러 처리
    }
  }, []); // formData가 변경될 때마다 이 함수를 다시 생성

  return addPurchaseInfo;
};
