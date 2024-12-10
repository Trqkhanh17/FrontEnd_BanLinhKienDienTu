import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { YourCart } from "../../interfaces/cartInterface";
interface CartState {
  dataCart: YourCart | null;
}
// Define the initial state using that type
const initialState: CartState = {
  dataCart: null,
};

export const cartSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    addCartToStore: (state, action: PayloadAction<YourCart>) => {
      const filter = action.payload;
      state.dataCart = filter;
    },
  },
});

export const { addCartToStore } = cartSlice.actions;

export default cartSlice.reducer;
