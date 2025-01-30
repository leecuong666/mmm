import {persistStore, persistReducer} from 'redux-persist';
import {reduxStorage} from './initMMKVStorage';
import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import appStateReducer from './appStateSlice';
import authenReducer from './authenticSlice';

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

const rootReducer = combineReducers({
  appState: appStateReducer,
  authen: authenReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persist = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
