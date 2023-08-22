import { 
    createSlice, 
} from "@reduxjs/toolkit";

interface InitialState {
    count: number;
    text?: string;
}

const initialState: InitialState = {
    count: 0,
    text: "我是文字",
};

export const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        add: (state: InitialState) => {
            state.count += 1;
        },
        minus: (state: InitialState) => {
            state.count -= 1;
        },
        change: (state: InitialState) => {
            state.text = "我是改变了的文字";
        },
        back: (state: InitialState) => {
            state.text = "我是文字";
        },
    },
});

export const { add, minus, change, back } = stateSlice.actions;
export default stateSlice.reducer;




