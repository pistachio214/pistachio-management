import React, {useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {shallowEqual} from "react-redux";
import {ConfigProvider} from "antd";

import {ThemeState} from "@/redux/types/Theme";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {RootState} from "@/redux/store";
import {navigate as tabNavigate} from "@/redux/slice/tab";

import {MenuContainer} from '@/components/Layout/style'
import {CallbackItem} from "@/types/common";
import {getRoute} from "@/utils/RouterUtil";
import {filterToMenu, getMenus} from "@/utils/MenuUtil";

import {baseRoutes} from "@/components/Router/router";

interface IProps {
    menuSelect: (value: CallbackItem) => void;
}

const SiderMenuComponent: React.FC<IProps> = (props: IProps) => {

    const tab = useAppSelector((state: RootState) => ({...state.tab}), shallowEqual);

    const themeState: ThemeState = useAppSelector((state: RootState) => ({...state.theme}), shallowEqual);

    const themeStyle = {
        token: {
            //悬停背景色
            colorBgTextHover: "white",
            colorText: themeState.config.token.colorPrimary,
        },
    };

    const navigate = useNavigate();
    const {pathname} = useLocation();
    const dispatch = useAppDispatch();

    const [openKeys, setOpenKeys] = useState<string[]>([]);

    //处理生成菜单数据
    const items = useMemo(() => {
        return getMenus(filterToMenu(baseRoutes));
    }, []);

    //根据activeKey来检索当前需要展开的菜单
    useEffect(() => {
        let key = "";
        for (const item of items) {
            // eslint-disable-next-line array-callback-return,no-loop-func
            (item as any).children?.map((child: any) => {
                child.key === tab.activeKey && (key = (item as any).key);
            });
        }

        key === "" ? setOpenKeys([]) : setOpenKeys([key]);
    }, [tab.activeKey, items]);

    //根据pathname初始化tabs
    useEffect(() => {
        if (pathname === "/") {
            props.menuSelect({key: "/dashboard", label: "工作台"});
        } else if (pathname !== "/") {
            const currentRoute = getRoute(pathname, baseRoutes);
            if (currentRoute?.element) {
                //如果不是菜单路由，则不触发菜单选择
                if (currentRoute.meta.hidden) {
                    let payload = {
                        key: currentRoute.path,
                        label: currentRoute.meta.title,
                        isMenu: false,
                    };

                    dispatch(tabNavigate(payload));
                } else {
                    props.menuSelect({
                        key: currentRoute.path,
                        label: currentRoute.meta.title,
                    });
                }
            } else {
                navigate('/404')
            }
        }
        // eslint-disable-next-line
    }, [pathname]);

    const onClick = ({key, item,}: { key: string; item: any; }) => {
        let payload = {
            key,
            label: item.props.title,
            isMenu: true,
        };

        dispatch(tabNavigate(payload));
    };

    return (
        <ConfigProvider theme={themeStyle}>
            <MenuContainer
                onSelect={onClick}
                mode={'inline'}
                openKeys={openKeys}
                onOpenChange={(keys) => setOpenKeys(keys)}
                selectedKeys={[tab.activeKey]}
                items={items}
                config={themeState.config}
                deepcolor={themeState.deepcolor}
            />
        </ConfigProvider>
    );

}

export default React.memo(SiderMenuComponent);
