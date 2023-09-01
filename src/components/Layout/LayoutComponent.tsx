import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
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
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ThemeState } from "@/redux/types/Theme";

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
import { CallbackItem } from "@/types/common";
import ColorSelectComponent from "@/components/ColorSelect/ColorSelectComponent";
import { navigate as tabNavigate } from "@/redux/slice/tab";
import SiderMenuComponent from "@/components/Layout/SiderMenuComponent";
import RouterTabsComponent from "@/components/Layout/RouterTabsComponent";
import KeepAliveComponent from "@/components/Layout/KeepAliveComponent";
import { RootState } from "@/redux/store";
import { setContentHeight } from "@/redux/slice/setting";
import { clearUserState } from "@/redux/slice/user";

const LayoutComponent: React.FC = () => {

    const contentRef = useRef<HTMLDivElement>(null);

    const themeState: ThemeState = useAppSelector((state: RootState) => ({...state.theme}), shallowEqual);
    const tab = useAppSelector((state: RootState) => ({...state.tab}), shallowEqual);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [collapsed, setCollapsed] = useState<boolean>(false);

    useEffect(() => {
        if (contentRef.current) {
            const height = contentRef.current.offsetHeight;
            dispatch(setContentHeight(height - 255));
        }
        // eslint-disable-next-line
    }, [])

    const menuSelect = (value: CallbackItem) => {
        let payload = {
            label: value.label,
            key: value.key,
            isMenu: true
        };
        dispatch(tabNavigate(payload))
    }

    const loginOut = () => {
        sessionStorage.clear();
        dispatch(clearUserState());

        navigate("/login", {replace: true});
    };

    return (
        <>
            <AntdLayout style={{height: "100vh"}}>
                <LaySider collapsed={collapsed} width={300} collapsible trigger={null}>
                    <SiderTitle config={themeState.config}>
                        <TitleLogo src={logo} width={30} height={30} alt={"logo"}/>
                        {!collapsed && <TitleFont>{defaultSettings.logoSystemTitle}</TitleFont>}
                    </SiderTitle>
                    <SiderMenuComponent menuSelect={menuSelect}/>
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
                                    萧十一郎
                                </UserTag>
                                <ColorSelectComponent/>
                                <Button type="primary" onClick={loginOut}>
                                    退出登录
                                </Button>
                            </Space>
                        </Row>
                    </LayHeader>

                    <LayContent>
                        {defaultSettings.isShowTabs ? (<RouterTabsComponent/>) : (<></>)}
                        <Container ref={contentRef}>
                            <KeepAliveComponent tabs={tab.tabs}/>
                        </Container>
                    </LayContent>

                </AntdLayout>
            </AntdLayout>
        </>
    );
}

export default React.memo(LayoutComponent);