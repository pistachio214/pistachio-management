import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import { ThemeState } from "@/redux/types/Theme";
import defaultSettings from "@/defaultSettings";

const initialState: ThemeState = {
    config: {
        token: {
            colorPrimary: defaultSettings.token?.colorPrimary || "#388991",
            colorLink: defaultSettings.token?.colorLink || "#388991",
            colorLinkActive: defaultSettings.token?.colorLinkActive || "#388991",
            colorLinkHover: defaultSettings.token?.colorLinkHover || "#388991",
        },
    },
    deepcolor: defaultSettings.deepColor || "#0060A7",
};

export const settingSlice = createSlice({
    name: "them",
    initialState,
    reducers: {
        changeColor(state: ThemeState, action: PayloadAction<string>) {
            state.config.token = {
                colorPrimary: action.payload,
                colorLink: action.payload,
                colorLinkActive: action.payload,
                colorLinkHover: action.payload,
            };
        },
        changeGradient(state: ThemeState, action: PayloadAction<string>) {
            state.deepcolor = action.payload;
        }
    },
});

export const {changeColor, changeGradient} = settingSlice.actions;
export default settingSlice.reducer;




