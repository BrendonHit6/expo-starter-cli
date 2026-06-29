import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAppState {
  isAuthenticated: boolean;
  isHydrating: boolean;
  currentRoute: string;
}

const initialState: IAppState = {
  isAuthenticated: false,
  isHydrating: true,
  currentRoute: '',
};

const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setHydrating(state, action: PayloadAction<boolean>) {
      state.isHydrating = action.payload;
    },
    setCurrentRoute(state, action: PayloadAction<string>) {
      state.currentRoute = action.payload;
    },
  },
});

export const { setAuthenticated, setHydrating, setCurrentRoute } = AppSlice.actions;
export default AppSlice.reducer;
