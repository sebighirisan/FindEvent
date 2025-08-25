import { JwtPayload } from "@/model/auth.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string | null;
  roles: string[];
  exp: number | null;
  token: string | null;
}

const initialState: AuthState = {
  username: null,
  roles: [],
  exp: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<JwtPayload>) => {
      state.username = payload.sub;
      state.roles = payload.roles;
      state.exp = payload.exp;
      state.token = payload.token;
    },
    logout: (state) => {
      Object.assign(state, {
        username: null,
        roles: [],
        exp: null,
        token: null,
      });
    },
  },
});

export default authSlice.reducer;
export const { setUser, logout } = authSlice.actions;
