import React, {
    useEffect
} from 'react';
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

    useEffect(() => {
        console.log('system theme: ', themeState)
    }, [themeState])

    return (
        <>
            <GlobalStyle></GlobalStyle>
            <ConfigProvider locale={zhCN} theme={{token: themeState.config.token}}>
                <RouterComponent/>
            </ConfigProvider>
        </>
    )
}
// <ConfigProvider theme={{
//   token: {
//     // Seed Token，影响范围大
//     colorPrimary: '#00b96b',
//     borderRadius: 2,
//
//     // 派生变量，影响范围小
//     colorBgContainer: '#f6ffed',
//   }
// }}
// >
//   <Space>
//     <Button type="primary">Primary</Button>
//     <Button>Default</Button>
//   </Space>
// </ConfigProvider>


export default App;
