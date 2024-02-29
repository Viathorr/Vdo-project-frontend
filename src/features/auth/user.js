import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: 'Viathor',
  country: 'Japan',
  email: 'theuseful13@gmail.com',
  phoneNumber: '',
  profileImage: 'https://cdn.imgchest.com/files/e4gdcverzr4.png'
};

export const userSlice = createSlice({
  name: 'user',
  initialState: { value: initialState },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    removeUser: (state, action) => {
      state.value = initialState;
    }
  }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
