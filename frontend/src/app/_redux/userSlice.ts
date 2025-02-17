import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userCookieData } from '../_types/types';

interface UserState {
  user: userCookieData | undefined;
}

const initialState: UserState = {
  user: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<userCookieData  | undefined>) => {
      state.user = action.payload;
    },
  }
});

export const { updateUserInfo } = userSlice.actions;

export default userSlice.reducer;