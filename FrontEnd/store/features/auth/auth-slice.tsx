import { JwtPayload } from "@/model/auth.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string | null;
  roles: string[];
  exp: number | null;
}

// 2️⃣ Provide the typed initial state
const initialState: AuthState = {
  username: null,
  roles: [],
  exp: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<JwtPayload>) => {
      state.username = payload.sub;
      state.roles = payload.roles;
      state.exp = payload.exp;
    },
    logout: (state) => {
      Object.assign(state, {
        username: null,
        roles: [],
        exp: null,
      });
    },
  },
});

export default authSlice.reducer;
export const { setUser, logout } = authSlice.actions;
