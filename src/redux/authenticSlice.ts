import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserInfoType} from '../types/auth';

const initialState: {user: UserInfoType} = {
  user: {},
};

const authenSlice = createSlice({
  name: 'authen',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserInfoType>) => {
      state.user = action.payload;
    },

    removeUser: state => {
      state.user = {};
    },
  },
});

export const {updateUser, removeUser} = authenSlice.actions;

export default authenSlice.reducer;
