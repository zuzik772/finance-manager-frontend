import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../entities/User";
import { UserAPI } from "../api/userAPI";
import { CreateUserDto } from "../dtos/CreateUserDto";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define a type for the slice state
// interface UserState {
//   users: User[];
//   isLoggedIn: boolean;
//   email: string | null;
//   password: string | null;
//   token: string | null;
// }

// // Define the initial state using that type
// const initialState: UserState = {
//   users: [],
//   isLoggedIn: false,
//   email: null,
//   password: null,
//   token: null,
// };

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

export const signUp = createAsyncThunk(
  "signUp",
  async (User: CreateUserDto, thunkAPI) => {
    return await UserAPI.createUser(User);
  }
);

export const login = createAsyncThunk("login", async (user: User, thunkAPI) => {
  const req = await axios.post(`http://192.168.1.156:3000/auth/login`, user);
  const res = await req.data.access_token;
  const localStorage = await AsyncStorage.setItem("user", JSON.stringify(res));
  console.log("localStorage", localStorage);
  return res;
});

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState,
  reducers: {},
  //   extraReducers: (builder) => {
  //     builder.addCase(signUp.fulfilled, (state, action) => {
  //       //Consequences from reducer
  //       state.users.push(action.payload);
  //       console.log("Sign up successful", action.payload);
  //     });
  //     builder.addCase(signUp.rejected, (state, action) => {
  //       // Handle the error here
  //       console.error("Error signing up:", action.error);
  //     });
  //   },
  // });
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      if (state.user) {
        state.user = action.payload;
        console.log(
          "UserSlice: Sign up successful",
          state.user,
          action.payload
        );
      }
      console.log("UserSlice: Sign up successful", action.payload);
    });
    builder.addCase(signUp.rejected, (state, action) => {
      console.error("UserSlice: Error signing up:", action.error);
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
  },
});
export const {} = userSlice.actions;
export default userSlice.reducer;
