import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import {Tab, TabState} from "@/redux/types/Tab";
import JSON5 from 'json5'

const initialState: TabState = {
    loading: false,
    tabs: JSON5.parse(sessionStorage.getItem("tabs") as string) || [],
    activeKey: JSON5.parse(sessionStorage.getItem("activeKey") as string) || "",
};

export const tabSlice = createSlice({
    name: "tab",
    initialState,
    reducers: {
        reload(state: TabState, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setTabs(state: TabState, action: PayloadAction<Tab[]>) {
            state.tabs = action.payload;
        },
        navigate(state: TabState, action: PayloadAction<{
            key: string; label: string; isMenu: boolean
        }>) {
            const {key, label, isMenu} = action.payload;
            const tab = state.tabs.find((item) => item.key === key);
            state.activeKey = key;
            if (!tab) {
                state.tabs.push({key, label, isMenu});
            }
        },
        setActiveKey(state: TabState, action: PayloadAction<string>) {
            state.activeKey = action.payload;
        },
    },
});

export const {reload, setTabs, navigate, setActiveKey} = tabSlice.actions;
export default tabSlice.reducer;




