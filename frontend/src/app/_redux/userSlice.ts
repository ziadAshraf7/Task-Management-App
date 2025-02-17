import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userCookieData } from '../_types/types';

interface UserState {
  user: userCookieData | null;
}

const initialState: UserState = {
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<userCookieData | null>) => {
      state.user = action.payload;
    },
  }
});

export const { updateUserInfo } = userSlice.actions;

export default userSlice.reducer;