import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IToastState {
  message: string;
  visible: boolean;
  type: 'success' | 'error' | 'info';
}

const initialState: IToastState = {
  message: '',
  visible: false,
  type: 'info',
};

const ToastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<{ message: string; type?: IToastState['type'] }>) {
      state.message = action.payload.message;
      state.type = action.payload.type ?? 'info';
      state.visible = true;
    },
    hideToast(state) {
      state.visible = false;
    },
  },
});

export const { showToast, hideToast } = ToastSlice.actions;
export default ToastSlice.reducer;
