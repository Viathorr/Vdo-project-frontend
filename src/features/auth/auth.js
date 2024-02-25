import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  accessToken: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: { value: initialState },
  reducers: {
    setAuth: (state, action) => {
      state.value = action.payload;
    },
    removeAuth: (state) => {
      state.value = initialState;
    }
  }
});

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;