import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initState = {
  id: 0,
  name: "",
  email: "",
  address: '',
  detailAddress: '',
  postCode: '',
  phone: '',
  is_active: false,
  is_staff:false,
  is_admin:false,
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.detailAddress = action.payload.detailAddress;
      state.postCode = action.payload.postCode;
      state.phone = action.payload.phone;
      state.is_active = action.payload.is_active;
      state.is_staff = action.payload.is_staff;
      state.is_admin = action.payload.is_admin;
      state.isLogin = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initState);
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
