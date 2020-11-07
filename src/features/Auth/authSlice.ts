
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthType {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthType = {
  token: null,
  isAuthenticated: false,
};

const Authoriztion = createSlice({
  name: "Authoriztion",
  initialState,
  reducers: {
    saveToken(state, { payload }: PayloadAction<null | string>) {
      if (payload) {
        state.token = payload;
      }
    },
    clearToken(state) {
      state.token = null;
    },
    setAuthState(state, { payload }: PayloadAction<boolean>) {
      state.isAuthenticated = payload;
    },
  },
});

export const { saveToken, clearToken, setAuthState } = Authoriztion.actions;
export default Authoriztion.reducer;