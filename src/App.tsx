import React from 'react';
import {ConfigProvider, App as AntdApp,} from 'antd';
import {ThemeState} from "@/redux/types/Theme";
import {useAppSelector} from "@/redux/hook";
import {shallowEqual} from "react-redux";
import zhCN from "antd/es/locale/zh_CN";
import RouterComponent from "@/components/Router/RouterComponent";

import GlobalStyle from "@/styles/global";
import {RootState} from "@/redux/store";
import EntryComponent from "@/components/Antd/EscapeAntd";

const App: React.FC = () => {

    // 主题
    const themeState: ThemeState = useAppSelector((state: RootState) => ({...state.theme}), shallowEqual);

    return (
        <>
            <GlobalStyle config={themeState.config}/>
            <ConfigProvider locale={zhCN} theme={{token: themeState.config.token}}>
                <AntdApp>
                    <EntryComponent/>
                    <RouterComponent/>
                </AntdApp>
            </ConfigProvider>
        </>
    )
}

export default App;
