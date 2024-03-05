/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";



const getOrders = async () => {
    const token = Cookies.get("access");
    try {
      const res = await axiosInstance.get('/api/purchase/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("getOrders", res.data);
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
  
  // useGetOrderList 훅을 useQuery 없이 구현
export const useGetOrderList = (setFunction) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
  
    
    const fetchData = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
          const result = await getOrders();
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
    }, []); // 의존성 배열이 비어 있으므로, 컴포넌트가 마운트될 때 한 번만 실행됩니다.
  
    return { data, isLoading, isError, refetch: fetchData };
  };

export default useGetOrderList;