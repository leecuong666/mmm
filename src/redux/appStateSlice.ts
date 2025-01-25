import {createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';

export interface AppState {
  isShowIntroduce: boolean;
}

const initialState: AppState = {
  isShowIntroduce: true,
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    updateIntroduceState: state => {
      state.isShowIntroduce = false;
    },
  },
});

export const {updateIntroduceState} = appStateSlice.actions;

export const selectAppState = (state: RootState) =>
  state.appState.isShowIntroduce;

export default appStateSlice.reducer;
