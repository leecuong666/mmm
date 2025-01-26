import {Appearance} from 'react-native';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AppState {
  isShowIntroduce: boolean;
  isDarkMode: boolean;
}

const initialState: AppState = {
  isShowIntroduce: true,
  isDarkMode: Appearance.getColorScheme() === 'dark',
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    updateIntroduceState: state => {
      state.isShowIntroduce = false;
    },
    updateDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const {updateIntroduceState, updateDarkMode} = appStateSlice.actions;

export default appStateSlice.reducer;
