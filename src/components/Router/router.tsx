import React, { ComponentType, LazyExoticComponent, lazy } from "react";
import * as Icon from '@ant-design/icons';
import { BaseRoute } from "@/components/Router/type";

import { BeforeRouterComponent } from "@/components/Router/BeforeRouterComponent";

import NonExistent from "@/pages/error";
import Login from "@/pages/login";

import LayoutComponent from "@/components/Layout/LayoutComponent";

import Dict from "@/pages/developer/dict"
import Oper from "@/pages/developer/oper";
import Exception from "@/pages/developer/exception";

import Dashboard from "@/pages/dashboard";
// import User from "@/pages/system/user";
import Role from "@/pages/system/role";
import Menu from "@/pages/system/menu";

const iconBC = (name?: string) => {
    if (name !== null && name !== undefined && name.length > 0) {
        return React.createElement((Icon && Icon as any)[name]);
    }

    return <></>;
}


const getComponent = (componentUrl: string): React.ReactNode => {
    const Component: LazyExoticComponent<ComponentType<any>> = lazy(() => import(componentUrl));

    return (
        <Component/>
    );
};

export const baseRoutes: BaseRoute[] = [
    {
        path: "/dashboard",
        name: "dashboard",
        element: <Dashboard/>,
        meta: {
            hidden: false,
            title: "工作台",
            icon: iconBC("DashboardFilled"),
        },
    },
    {
        path: "/system",
        name: "system",
        meta: {
            hidden: false,
            title: "系统设置",
            icon: iconBC("SettingOutlined"),
        },
        children: [
            {
                path: '/system/users',
                element: getComponent("../../pages/system/user"),
                name: 'users',
                hasPermiss: ["sys:user:list"],
                meta: {
                    hidden: false,
                    title: '人员管理'
                }
            },
            {
                path: '/system/roles',
                element: <Role/>,
                name: 'roles',
                hasPermiss: ["sys:role:list"],
                meta: {
                    hidden: false,
                    title: '角色管理'
                }
            },
            {
                path: '/system/menus',
                element: <Menu/>,
                name: 'menus',
                hasPermiss: ["sys:menu:list"],
                meta: {
                    hidden: false,
                    title: '菜单管理'
                }
            },
        ]
    },
    {
        path: "/developer",
        name: "developer",
        meta: {
            hidden: false,
            title: "开发者工具",
            icon: iconBC("RadiusSettingOutlined"),
        },
        children: [
            {
                path: '/developer/dict',
                element: <Dict/>,
                name: 'dict',
                hasPermiss: ["developer:dict:list"],
                meta: {
                    hidden: false,
                    title: '数据字典'
                }
            },
            {
                path: '/developer/oper',
                element: <Oper/>,
                name: 'oper',
                hasPermiss: ["developer:oper:log:list"],
                meta: {
                    hidden: false,
                    title: '操作日志'
                }
            },
            {
                path: '/developer/exception',
                element: <Exception/>,
                name: 'exception',
                hasPermiss: ["developer:exception:log:list"],
                meta: {
                    hidden: false,
                    title: '异常日志'
                }
            },
        ]
    },
];

export const routes = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        element: <BeforeRouterComponent/>,
        children: [
            {
                path: '/',
                name: 'layout',
                element: <LayoutComponent/>,
                children: baseRoutes
            }
        ]
    },
    {
        path: "*",
        element: <NonExistent/>
    }
];