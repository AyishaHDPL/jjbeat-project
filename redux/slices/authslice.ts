import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface user {
  userName: string;
  role: string;
}
interface AuthState {
  user: user | null;
  token: string | null;
  isAuthenticated: boolean;
}
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: user; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
