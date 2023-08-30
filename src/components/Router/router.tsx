import React from "react";
import * as Icon from '@ant-design/icons';
import { BaseRoute } from "@/components/Router/type";
import { AuthorNavsType, RouteReactNode } from "@/types/common";

import { BeforeRouterComponent } from "@/components/Router/BeforeRouterComponent";

import NonExistent from "@/pages/error";
import Login from "@/pages/login";

import LayoutComponent from "@/components/Layout/LayoutComponent";

import Dict from "@/pages/developer/dict"
import Oper from "@/pages/developer/oper";
import Exception from "@/pages/developer/exception";

import Dashboard from "@/pages/dashboard";
import User from "@/pages/system/user";
import Role from "@/pages/system/role";
import Menu from "@/pages/system/menu";

const iconBC = (name?: string) => {

    if (name !== null && name !== undefined && name.length > 0) {
        return React.createElement((Icon && Icon as any)[name]);
    }

    return undefined;
}

const RouteNodeMap: RouteReactNode[] = [
    {key: "Dict", component: <Dict/>},
    {key: "Oper", component: <Oper/>},
    {key: "Exception", component: <Exception/>},

    {key: "Dashboard", component: <Dashboard/>},
    {key: "User", component: <User/>},
    {key: "Role", component: <Role/>},
    {key: "Menu", component: <Menu/>},
];

// 根据路由的key获取路由ReactNode组件
const getComponent = (key: string | null) => {
    if (key !== null) {
        const reactNode = RouteNodeMap.find((reactNodeMap: RouteReactNode) => reactNodeMap.key === key)
        if (reactNode) {
            return reactNode.component;
        }
    }

    return undefined;
}

export const generateRoutes = () => {
    return [
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
                    children: allRoutes
                }
            ]
        },
        {
            path: "*",
            element: <NonExistent/>
        }
    ]
}


export const generateBaseRoutes = (data: AuthorNavsType[]) => {
    let res: BaseRoute[] = [];

    if (data.length > 0) {
        data.forEach((item: AuthorNavsType, index: number) => {
            let component = getComponent(item.component);
            let db: BaseRoute = {
                path: item.path,
                name: `${item.name || ""}-${index}`,
                element: component,
                meta: {
                    hidden: generateMetaHidden(item),
                    title: item.title,
                    icon: iconBC(item.icon || undefined),
                },
            };

            if (item.children !== undefined && item.children !== null && item.children.length > 0) {
                db.children = generateBaseRoutes(item.children)
            }

            res.push(db);
        })
    }

    return res;
}

const generateMetaHidden = (data: AuthorNavsType) => {
    let component = getComponent(data.component);

    return component === undefined && data.children === undefined;
}

export const allRoutes: BaseRoute[] = [
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
                element: getComponent("User"),
                name: 'users',
                meta: {
                    hidden: false,
                    title: '人员管理'
                }
            },
            {
                path: '/system/roles',
                element: <Role/>,
                name: 'roles',
                meta: {
                    hidden: false,
                    title: '角色管理'
                }
            },
            {
                path: '/system/menus',
                element: <Menu/>,
                name: 'menus',
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
                meta: {
                    hidden: false,
                    title: '数据字典'
                }
            },
            {
                path: '/developer/oper',
                element: <Oper/>,
                name: 'oper',
                meta: {
                    hidden: false,
                    title: '操作日志'
                }
            },
            {
                path: '/developer/exception',
                element: <Exception/>,
                name: 'exception',
                meta: {
                    hidden: false,
                    title: '异常日志'
                }
            },
        ]
    },
];