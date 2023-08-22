import React, {useState} from "react";
import {useNavigate} from "react-router";
import {
    Button,
    Layout as AntdLayout,
    Row,
    Space,
} from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {shallowEqual} from "react-redux";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {ThemeState} from "@/redux/types/Theme";

import {
    LaySider,
    SiderTitle,
    TitleLogo,
    TitleFont,
    LayHeader,
    UserTag,
    LayContent,
    Container,
} from "@/components/Layout/style";

import logo from "@/assets/react.png";
import defaultSettings from "@/defaultSettings";
import SiderMenu from "@/components/Layout/SiderMenu";
import {CallbackItem} from "@/types/common";
import ColorSelectComponent from "@/components/ColorSelect/ColorSelectComponent";
import {navigate as tabNavigate} from "@/redux/slice/tab";
import RouterTabs from "@/components/Layout/RouterTabs";
import KeepAlive from "@/components/Layout/KeepAlive";
import {RootState} from "@/redux/store";

const Layout: React.FC = () => {

    const themeState: ThemeState = useAppSelector((state: RootState) => ({...state.theme}), shallowEqual);
    const tab = useAppSelector((state: RootState) => ({...state.tab}), shallowEqual);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [collapsed, setCollapsed] = useState<boolean>(false);

    const menuSelect = (value: CallbackItem) => {
        let payload = {
            label: value.label,
            key: value.key,
            isMenu: true
        };
        dispatch(tabNavigate(payload))
    }

    const loginOut = () => {
        sessionStorage.remove("token");
        navigate("/login", {replace: true});
    };

    return (
        <>
            <AntdLayout style={{height: "100vh"}}>
                <LaySider collapsed={collapsed} width={200} collapsible trigger={null}>
                    <SiderTitle config={themeState.config}>
                        <TitleLogo src={logo} width={30} height={30} alt={"logo"}/>
                        {!collapsed && <TitleFont>{defaultSettings.title}</TitleFont>}
                    </SiderTitle>
                    <SiderMenu menuSelect={menuSelect}></SiderMenu>
                </LaySider>
                <AntdLayout>
                    <LayHeader>
                        <Button onClick={() => {
                            setCollapsed((prevState: boolean) => !prevState)
                        }}>
                            {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        </Button>
                        <Row align={"middle"}>
                            <Space>
                                <UserTag icon={<UserOutlined/>} bordered={false}>
                                    admin
                                </UserTag>
                                <ColorSelectComponent/>
                                <Button type="primary" onClick={loginOut}>
                                    退出登录
                                </Button>
                            </Space>
                        </Row>
                    </LayHeader>

                    <LayContent>
                        <RouterTabs/>
                        <Container>
                            <KeepAlive tabs={tab.tabs}></KeepAlive>
                        </Container>
                    </LayContent>

                </AntdLayout>
            </AntdLayout>
        </>
    );
}

export default React.memo(Layout);