import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface MenuBarState {
  value: boolean;
}

// Define the initial state using that type
const initialState: MenuBarState = {
  value: false,
};

export const menuBarSlice = createSlice({
  name: "menuBar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleMenuBar: (state, actions: PayloadAction<boolean>) => {
      state.value = actions.payload;
    },
  },
});

export const { handleMenuBar } = menuBarSlice.actions;

export default menuBarSlice.reducer;
