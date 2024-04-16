import { useState } from 'react';
import { axiosInstance } from "../api/axiosInstance";
import Cookies from "js-cookie";




export const useGetPurchaseDetail = (purchaseId) => {
    console.log("useGetPI", purchaseId);
    const [purchaseDetails, setPurchaseDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
  
    const getPurchaseDetails = async () => {
      if (retryCount >= 3) return;
      setLoading(true);
      const token = Cookies.get("access");
      try {
        const response = await axiosInstance.get(`/api/purchase/${purchaseId}/all-detail/`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPurchaseDetails(response.data);
        setRetryCount(0); 
      } catch (error) {
        setError(error);
        if(error.response && error.response.status === 401){
            console.error('Unauthorized access. Please check authentication.');
        }else {
            setRetryCount(retryCount + 1); // Increment retry count on other errors
        }
        
      } finally {
        setLoading(false);
      }
    };
  
    return { purchaseDetails, getPurchaseDetails, loading, error };
  };

export default useGetPurchaseDetail;
