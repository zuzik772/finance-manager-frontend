import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import entryReducer from "./entrySlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    entry: entryReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
