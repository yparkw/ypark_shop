import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { getUserData } from "../api";
import { setUser } from "../redux/reducer/userSlice";

export default function useGetUserInfo(id) {
  const dispatch = useDispatch();
  const { refetch, isLoading } = useQuery(
    ["getUserData", id],
    () => getUserData(id),
    {
      enabled: false,
      retry: 1,
      onSuccess: (res) => {
        console.log('getUserData', res);
        dispatch(
          setUser({
            id: res.data.id,
            name: res.data.username,
            email: res.data.email,
            phone: res.data.phone,
            address: res.data.address,
            detailAddress: res.data.detailAddress,
            postCode: res.data.postCode,
            is_active: res.data.is_active,
            is_admin: res.data.is_admin,
            is_staff: res.data.is_staff,
            isLogin: true,
          })
        );
      },
    }
  );
  return { refetch, isLoading };
}
