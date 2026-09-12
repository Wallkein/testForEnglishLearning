import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { mockLogin } from "../services/api";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "../services/storage";

interface AuthState {
  user: string | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: getStorageItem("ec_user"),
  status: "idle",
  error: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    { login, password }: { login: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const user = await mockLogin(login, password);
      setStorageItem("ec_user", user);
      return user;
    } catch {
      return rejectWithValue("Неправильные логин или пароль");
    }
  },
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  removeStorageItem("ec_user");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Вход невозможен";
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.error = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
