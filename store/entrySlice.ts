import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

import { Entry } from "../entities/Entry";
import { EntryAPI } from "../api/entryAPI";
import { CreateEntryDto } from "../dtos/CreateEntryDto";
import { UpdateEntryDTO } from "../dtos/UpdateEntryDto";

// Define a type for the slice state
interface EntryState {
  entries: Entry[];
}

// Define the initial state using that type
const initialState: EntryState = {
  entries: [],
};

export const fetchEntries = createAsyncThunk(
  "fetchEntries",
  async (thunkAPI) => {
    return await EntryAPI.fetchAll();
  }
);
export const createEntry = createAsyncThunk(
  "createEntry",
  async (entry: CreateEntryDto, thunkAPI) => {
    return await EntryAPI.createEntry(entry);
  }
);
export const updateEntry = createAsyncThunk(
  "updateEntry",
  async ({ id, entry }: { id: number; entry: UpdateEntryDTO }, thunkAPI) => {
    await EntryAPI.updateEntry(id, entry);
    return entry;
  }
);
export const deleteEntry = createAsyncThunk(
  "deleteEntry",
  async (id: number, thunkAPI) => {
    await EntryAPI.deleteEntry(id);
    return id;
  }
);

export const entrySlice = createSlice({
  name: "entries",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      //Consequences from reducer
      state.entries = action.payload;
    });
    builder.addCase(createEntry.fulfilled, (state, action) => {
      //Consequences from reducer
      state.entries.push(action.payload);
    });
    builder.addCase(updateEntry.fulfilled, (state, action) => {
      //Consequences from reducer
      const index = state.entries.findIndex(
        (entry) => entry.id === action.payload.id
      );
      state.entries[index] = action.payload;
    });
    builder.addCase(deleteEntry.fulfilled, (state, action) => {
      //Consequences from reducer
      state.entries = state.entries.filter(
        (entry) => entry.id !== action.payload
      );
    });
  },
});
export const {} = entrySlice.actions;
export default entrySlice.reducer;
