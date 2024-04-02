import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../entities/User";
import { UserAPI } from "../api/userAPI";
import { CreateUserDto } from "../dtos/CreateUserDto";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type InitialStateProps = {
  user: User | null;
  isLoading: boolean;
  error: string | undefined | null;
};

const initialState: InitialStateProps = {
  user: null,
  isLoading: false,
  error: null,
};

const baseUrl = "http://192.168.1.155:3000";

export const signUp = createAsyncThunk(
  "signUp",
  async (user: CreateUserDto, thunkAPI) => {
    const req = await axios.post(`${baseUrl}/auth/signUp`, user);
    return await req.data;
  }
);

export const login = createAsyncThunk("login", async (user: User, thunkAPI) => {
  try {
    const req = await axios.post(`${baseUrl}/auth/login`, user);
    const res = await req.data.access_token;
    console.log("Data received:", res);
    await AsyncStorage.setItem("user", JSON.stringify(res));
    console.log("Data stored successfully");
    return res;
  } catch (error: any) {
    console.error("Error storing data:", error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    await AsyncStorage.removeItem("user");
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      console.log(action.error.message);
      if (action.error.message === "Request failed with status code 401") {
        state.error = "Access Denied! Invalid Credentials";
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.user = null;
      state.error = null;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      console.log(action.error.message);
      if (action.error.message === "Request failed with status code 401") {
        state.error = "Access Denied! Invalid Credentials";
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.error = null;
    });
  },
});
export const {} = userSlice.actions;
export default userSlice.reducer;
