import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EntryAPI } from "../api/entryAPI";
import { CreateEntryDto } from "../dtos/CreateEntryDto";
import { UpdateEntryDTO } from "../dtos/UpdateEntryDto";
import { Entry } from "../entities/Entry";

// Define a type for the slice state
interface EntryState {
  entries: Entry[];
  error: string | null;
}

// Define the initial state using that type
const initialState: EntryState = {
  entries: [],
  error: null,
};

export const fetchEntries = createAsyncThunk(
  "fetchEntries",
  async (_, thunkAPI) => {
    try {
      return await EntryAPI.fetchAll();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createEntry = createAsyncThunk(
  "createEntry",
  async (entry: CreateEntryDto, thunkAPI) => {
    try {
      return await EntryAPI.createEntry(entry);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateEntry = createAsyncThunk(
  "updateEntry",
  async ({ id, entry }: { id: number; entry: UpdateEntryDTO }, thunkAPI) => {
    try {
      await EntryAPI.updateEntry(id, entry);
      return entry;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteEntry = createAsyncThunk(
  "deleteEntry",
  async (id: number, thunkAPI) => {
    try {
      const response = await EntryAPI.deleteEntry(id);
      return response.data;
    } catch (error: any) {
      console.error("ENTRY SLICE Error deleting entry:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const entrySlice = createSlice({
  name: "entries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      state.entries = action.payload;
      state.error = null;
    });
    builder.addCase(fetchEntries.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(createEntry.fulfilled, (state, action) => {
      state.entries.push(action.payload);
      state.error = null;
    });
    builder.addCase(createEntry.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateEntry.fulfilled, (state, action) => {
      const index = state.entries.findIndex(
        (entry) => entry.id === action.payload.id
      );
      state.entries[index] = action.payload;
      state.error = null;
    });
    builder.addCase(updateEntry.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(deleteEntry.fulfilled, (state, action) => {
      state.entries = state.entries.filter(
        (entry) => entry.id !== action.payload
      );
      state.error = null;
    });
    builder.addCase(deleteEntry.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const {} = entrySlice.actions;
export default entrySlice.reducer;
