interface Tab {
    key: string;
    label: string;
    isMenu: boolean;
}

interface TabState {
    loading: boolean;
    tabs: Tab[];
    activeKey: string;
}

export type {
    TabState,
    Tab
}