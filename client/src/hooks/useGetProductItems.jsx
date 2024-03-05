/* eslint-disable no-unused-vars */
import { useQuery } from "react-query";
import { axiosInstance } from "../api/axiosInstance";

const getProductItems = async (param) => {
  try{
    const res = await axiosInstance.get('/api/products', {
      params: param,
    }, {withCredentials: false});
    return res.data;
  } catch(error){
    console.error('Error fetching product items', 
    {
      message: error.message,
      response: error.response,
      request: error.request,
    });
    throw error;
  }
};

export default function useGetProductItems(params, setFunction) {
  const { data, isLoading, isSuccess, isError, refetch } = useQuery(
    ["getItems", params],
    () => getProductItems(params),
    {
      retry: 2,
      staleTime: 1000 * 60 * 30,
      onSuccess: () => {
        setFunction(true);
        setTimeout(() => {
          setFunction(false);
        }, 1200);
      },
      onError: (error) => {
        console.error('Error in useQuery:', {
          message: error.message,
          response: error.response,
          request: error.request,
        });
      }
    }
  );

  return { data, isLoading, isSuccess, isError, refetch };
}
