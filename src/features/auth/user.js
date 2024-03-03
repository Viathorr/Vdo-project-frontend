import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  country: '',
  email: '',
  phoneNumber: '',
  profileImage: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState: { value: initialState },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    removeUser: (state) => {
      state.value = initialState;
    }
  }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
