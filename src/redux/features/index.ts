import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface CounterState {
    value: number
}

// Define the initial state using that type
const initialState: CounterState = {
    value: 0,
}

export const counterSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        handleMenuBar: (state, actions: PayloadAction<number>) => {
            state.value = actions.payload + 1
        },

    },
})

export const { handleMenuBar } = counterSlice.actions

export default counterSlice.reducer