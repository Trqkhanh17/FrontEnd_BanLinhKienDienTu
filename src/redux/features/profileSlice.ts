import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProfileAPI } from "../../api/authAPI";

// Define a type for the slice state
interface Profile {
  cus_id?: number;
  cus_name?: string;
  cus_address?: string;
  cus_birthday?: string;
  cus_avatar?: string | null;
  cus_phone?: string;
  cus_email?: string;
  cus_create?: string;
  cus_update?: string | null;
  is_banned?: number;
}

interface ProfileState {
  dataProfile: Profile | null;
  isLoading: boolean;
  isError: boolean;
}
// Define the initial state using that type
const initialState: ProfileState = {
  dataProfile: null,
  isLoading: false,
  isError: false,
};

const handleState = (
  state: ProfileState,
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

export const fetchGetProfile = createAsyncThunk(
  "profile/fetchGetProfile",
  async (_, thunkAPI) => {
    try {
      const res = await getProfileAPI();
      if (res.data.statusCode === 200) {
        return res.data.data[0];
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const profileSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetProfile.pending, (state) =>
        handleState(state, "pending")
      )
      .addCase(
        fetchGetProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          handleState(state, "fulfilled");
          state.dataProfile = action.payload;
        }
      )
      .addCase(fetchGetProfile.rejected, (state) =>
        handleState(state, "rejected")
      );
  },
});

export default profileSlice.reducer;
