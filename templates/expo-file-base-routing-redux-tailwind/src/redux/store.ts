import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import AppReducer from './slices/AppSlice';
import UserReducer from './slices/UserSlice';
import ToastReducer from './slices/ToastSlice';

export const store = configureStore({
  reducer: {
    app: AppReducer,
    user: UserReducer,
    toast: ToastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
