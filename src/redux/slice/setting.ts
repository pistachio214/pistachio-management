import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import { SettingState } from "@/redux/types/Setting";

const initialState: SettingState = {
    clientHeight: 0,
    contentHeight: 600,
    reloadMenu: false
};

export const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        setClientHeight: (state: SettingState, action: PayloadAction<number>) => {
            state.clientHeight = action.payload;
        },
        setContentHeight: (state: SettingState, action: PayloadAction<number>) => {
            state.contentHeight = action.payload;
        },
        setReloadMenu: (state: SettingState, action: PayloadAction<boolean>) => {
            state.reloadMenu = action.payload
        }
    },
});

export const {setClientHeight, setContentHeight, setReloadMenu} = settingSlice.actions;
export default settingSlice.reducer;




