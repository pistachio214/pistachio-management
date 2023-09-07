import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
    Button,
    Layout as AntdLayout,
    Row,
    Space,
    Dropdown,
} from "antd";
import type { MenuProps } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    LogoutOutlined,
    SettingOutlined,
    EditOutlined,
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
    LayContent,
    Container,
} from "@/components/Layout/style";

import logo from "@/assets/react.png";
import defaultSettings from "@/defaultSettings";
import { CallbackItem } from "@/types/common";
import ColorSelectComponent from "@/components/ColorSelect/ColorSelectComponent";
import { clearTabs, navigate as tabNavigate } from "@/redux/slice/tab";
import SiderMenuComponent from "@/components/Layout/SiderMenuComponent";
import RouterTabsComponent from "@/components/Layout/RouterTabsComponent";
import KeepAliveComponent from "@/components/Layout/KeepAliveComponent";
import { RootState } from "@/redux/store";
import { setContentHeight } from "@/redux/slice/setting";
import { clearUserState } from "@/redux/slice/user";
import UserInfoDrawerComponent from "@/components/Layout/UserInfoDrawerComponent";
import { TabState } from "@/redux/types/Tab";
import { UserState } from "@/redux/types/User";
import UserChangePasswordDrawerComponent from "@/components/Layout/UserChangePasswordDrawerComponent";

const LayoutComponent: React.FC = () => {

    const contentRef = useRef<HTMLDivElement>(null);

    const themeState: ThemeState = useAppSelector((state: RootState) => ({...state.theme}), shallowEqual);
    const tabState: TabState = useAppSelector((state: RootState) => ({...state.tab}), shallowEqual);
    const userState: UserState = useAppSelector((state: RootState) => ({...state.user}), shallowEqual);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [userInfoDrawerOpen, setUserInfoDrawerOpen] = useState<boolean>(false);
    const [userChangePasswordDrawerOpen, setUserChangePasswordDrawerOpen] = useState<boolean>(false);

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Button
                    type={"link"}
                    icon={<SettingOutlined/>}
                    block={true}
                    style={{
                        color: '#000000',
                    }}
                >
                    个人信息
                </Button>
            ),
        },
        {
            key: '2',
            label: (
                <Button
                    type={"link"}
                    icon={<EditOutlined/>}
                    block={true}
                    style={{
                        color: '#000000',
                    }}
                >
                    修改密码
                </Button>
            ),
        },
        {
            type: 'divider',
        },
        {
            label: (
                <Button
                    type={"link"}
                    icon={<LogoutOutlined/>}
                    block={true}
                    danger={true}

                >
                    退出系统
                </Button>
            ),
            key: '3',
        },
    ];

    const onClickItems = (key: string) => {
        switch (key) {
            case "1":
                showUserInfoDrawer();
                break;
            case "2":
                showChangePasswordDrawer();
                break;
            case "3":
                loginOut();
                break;
            default:
                console.log("未知选择");
        }
    }

    useEffect(() => {
        if (contentRef.current) {
            const height = contentRef.current.offsetHeight;
            dispatch(setContentHeight(height - 255));
        }
        // eslint-disable-next-line
    }, [])

    // 展示 用户信息抽屉
    const showUserInfoDrawer = () => {
        setUserInfoDrawerOpen(true);
    }

    // 展示 修改密码抽屉
    const showChangePasswordDrawer = () => {
        setUserChangePasswordDrawerOpen(true);
    }

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
        dispatch(clearTabs());

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
                                <Dropdown menu={{
                                    items,
                                    onClick: (e: {key: string}) => onClickItems(e.key),
                                }} trigger={['click']}>
                                    <Button
                                        onClick={(e) => e.preventDefault()}
                                        icon={<UserOutlined/>}
                                    >
                                        {userState.data.nickname}
                                    </Button>
                                </Dropdown>

                                <ColorSelectComponent/>

                            </Space>
                        </Row>
                    </LayHeader>

                    <LayContent>
                        {defaultSettings.isShowTabs ? (<RouterTabsComponent/>) : (<></>)}
                        <Container ref={contentRef}>
                            <KeepAliveComponent tabs={tabState.tabs}/>
                        </Container>
                    </LayContent>

                </AntdLayout>
            </AntdLayout>

            <UserInfoDrawerComponent
                open={userInfoDrawerOpen}
                onClose={() => setUserInfoDrawerOpen(false)}
            />

            <UserChangePasswordDrawerComponent
                open={userChangePasswordDrawerOpen}
                onClose={() => setUserChangePasswordDrawerOpen(false)}
                changeSuccess={() => loginOut()}
            />
        </>
    );
}

export default React.memo(LayoutComponent);