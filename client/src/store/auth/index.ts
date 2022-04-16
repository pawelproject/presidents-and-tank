import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface AuthState {
  token: string | null;
  email: string | null;
  username: string | null;
  role: string | null;
  isLoggedIn: boolean;
  fullName: string | null;
  country: string | null;
  hasNuclearBomb: boolean | null;
  createdAt: string | null;
}

const initialState: AuthState = {
  email: null,
  token: null,
  username: null,
  role: null,
  isLoggedIn: false,
  country: null,
  fullName: null,
  hasNuclearBomb: null,
  createdAt: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      localStorage.setItem("token", action.payload.token);
      return {
        ...action.payload,
        username: "gowno",
        isLoggedIn: true,
        role: "gowno",
      };
    },
    clearState: (state) => {
      localStorage.removeItem("token");
      return initialState;
    },
  },
});

export const { setUser, clearState } = authSlice.actions;

export default authSlice.reducer;
