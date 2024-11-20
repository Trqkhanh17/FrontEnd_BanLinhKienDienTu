import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllStaff } from "../../api/staffAPI";

// Define a type for the slice state
interface Staff {
  staff_id: number;
  user_name: string;
  staff_phone: string;
  staff_email: string;
}

interface StaffState {
  dataStaff: Staff[];
  isLoading: boolean;
  isError: boolean;
}

// Define the initial state using that type
const initialState: StaffState = {
  dataStaff: [],
  isLoading: false,
  isError: false,
};

const handleState = (
  state: StaffState,
  type: "pending" | "fulfilled" | "rejected"
) => {
  switch (type) {
    case "pending":
      state.isLoading = true;
      state.isError = false;
      break;
    case "fulfilled":
      state.isLoading = false;
      state.isError = false;
      break;
    case "rejected":
      state.isLoading = false;
      state.isError = true;
      break;
  }
};

export const fetchGetAllStaff = createAsyncThunk(
  "staff/fetchGetAllStaff",
  async (_, thunkAPI) => {
    try {
      const res = await getAllStaff();
      if (res.data.statusCode === 200) {
        return res.data.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAllStaff.pending, (state) =>
        handleState(state, "pending")
      )
      .addCase(
        fetchGetAllStaff.fulfilled,
        (state, action: PayloadAction<Staff[]>) => {
          handleState(state, "fulfilled");
          state.dataStaff = action.payload;
        }
      )
      .addCase(fetchGetAllStaff.rejected, (state) =>
        handleState(state, "rejected")
      );
  },
});

export default staffSlice.reducer;
