import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserInterface } from '../../types/UserInterface';

interface IUserState {
  user: IUserInterface | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  user: null,
  isLoading: false,
  error: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserInterface | null>) {
      state.user = action.payload;
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = UserSlice.actions;
export default UserSlice.reducer;
