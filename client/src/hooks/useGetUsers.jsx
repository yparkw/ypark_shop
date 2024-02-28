/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import { axiosInstance } from "../api/axiosInstance";

const getUsers = async (param) => {
  const token = Cookies.get("access");
  try{
    const res = await axiosInstance.get('/api/user/list/', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
  } catch(error){
    console.error('Error fetching user items', 
    {
      message: error.message,
      response: error.response,
      request: error.request,
    });
    throw error;
  }
};

export default function useGetUsers(params, setFunction) {
  const { data, isLoading, isSuccess, isError, refetch } = useQuery(
    ["getUsers", params],
    () => getUsers(params),
    {
      retry: 2,
      staleTime: 1000 * 60 * 30,
      onSuccess: () => {
      if (typeof setFunction === 'function'){
          setFunction(true);
          setTimeout(() => {
            setFunction(false);
          }, 1200);
        }
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
