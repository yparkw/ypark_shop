/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";



const getOrders = async (status) => {
    const token = Cookies.get("access");
    try {
      const url = status ? `/api/purchase/?status=${status}` : '/api/purchase/';
      const res = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error fetching user items', {
        message: error.message,
        response: error.response,
        request: error.request,
      });
      throw error;
    }
  };
export const useGetOrderList = (status, setFunction) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
  
    
    const fetchData = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
          const result = await getOrders(status);
          setData(result);
          if (typeof setFunction === 'function') {
            setFunction(true);
            setTimeout(() => {
              setFunction(false);
            }, 1200);
          }
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };
  
      useEffect(() => {
        fetchData();
    }, [status]); // 의존성 배열이 비어 있으므로, 컴포넌트가 마운트될 때 한 번만 실행됩니다.
  
    return { data, isLoading, isError, refetch: fetchData };
  };

export default useGetOrderList;