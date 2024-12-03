import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features";
import staffSlice from "../features/staffSlice";
import menuBarSlice from "../features/menuBarSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    staff: staffSlice,
    menuStatus: menuBarSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
