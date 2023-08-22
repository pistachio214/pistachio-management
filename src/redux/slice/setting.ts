import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import { SettingState } from "@/redux/types/Setting";

const initialState: SettingState = {
    clientHeight: 0
};

export const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        setClientHeight: (state: SettingState, action: PayloadAction<number>) => {
            state.clientHeight = action.payload;
        },
    },
});

export const { setClientHeight } = settingSlice.actions;
export default settingSlice.reducer;




