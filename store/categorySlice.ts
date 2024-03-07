import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "../entities/Category";
import { CategoryAPI } from "../api/categoryAPI";
import { CreateCategoryDto } from "../dtos/CreateCategoryDto";

// Define a type for the slice state
interface CategoryState {
  categories: Category[];
}

// Define the initial state using that type
const initialState: CategoryState = {
  categories: [],
};

export const fetchCategories = createAsyncThunk(
  "fetchCategories",
  async (thunkAPI) => {
    return await CategoryAPI.fetchAll();
  }
);

export const createCategory = createAsyncThunk(
  "createCategory ",
  async (category: CreateCategoryDto, thunkAPI) => {
    return await CategoryAPI.createCategory(category);
  }
);

export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (
    { categoryName, id }: { categoryName: string; id: number },
    thunkAPI
  ) => {
    return await CategoryAPI.updateCategory(categoryName, id);
  }
);

export const deleteCategory = createAsyncThunk(
  "deleteCategory ",
  async (id: number, thunkAPI) => {
    await CategoryAPI.deleteCategory(id);
    return id;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.categories = state.categories.map((category) =>
        category.id === action.payload.id ? action.payload : category
      );
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    });
  },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
