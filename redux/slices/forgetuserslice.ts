import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null;
}

const initialState: AuthState = {
  user: null,
};

const forgetUserSlice = createSlice({
  name: "forgetuser",
  initialState,
  reducers: {
    userDetailsInForgetPassword: (
      state,
      action: PayloadAction<string>
    ) => {
      state.user = action.payload;
    },
    clearForgetUser: (state) => {
      state.user = null;
    },
  },
});

export const {
  userDetailsInForgetPassword,
  clearForgetUser,
} = forgetUserSlice.actions;

// ✅ DEFAULT EXPORT
export default forgetUserSlice.reducer;
