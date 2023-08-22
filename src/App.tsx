import React from 'react';
import {ConfigProvider} from 'antd';
import {ThemeState} from "@/redux/types/Theme";
import {useAppSelector} from "@/redux/hook";
import {shallowEqual} from "react-redux";
import zhCN from "antd/es/locale/zh_CN";
import RouterComponent from "@/components/Router/RouterComponent";

import GlobalStyle from "@/styles/global";
import {RootState} from "@/redux/store";

const App: React.FC = () => {

    // 主题
    const themeState: ThemeState = useAppSelector((state: RootState) => ({...state.theme}), shallowEqual);

    return (
        <>
            <GlobalStyle></GlobalStyle>
            <ConfigProvider locale={zhCN} theme={{token: themeState.config.token}}>
                <RouterComponent/>
            </ConfigProvider>
        </>
    )
}

export default App;
