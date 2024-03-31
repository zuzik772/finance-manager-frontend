import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../entities/User";
import { UserAPI } from "../api/userAPI";
import { CreateUserDto } from "../dtos/CreateUserDto";

// Define a type for the slice state
interface UserState {
  users: User[];
}

// Define the initial state using that type
const initialState: UserState = {
  users: [],
};

export const signUp = createAsyncThunk(
  "signUp",
  async (User: CreateUserDto, thunkAPI) => {
    return await UserAPI.createUser(User);
  }
);

export const userSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      //Consequences from reducer
      state.users.push(action.payload);
      console.log("Sign up successful", action.payload);
    });
    builder.addCase(signUp.rejected, (state, action) => {
      // Handle the error here
      console.error("Error signing up:", action.error);
    });
  },
});
export const {} = userSlice.actions;
export default userSlice.reducer;
