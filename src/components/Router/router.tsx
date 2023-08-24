import React from "react";
import {DashboardFilled, RadiusSettingOutlined, SettingOutlined} from "@ant-design/icons";
import {BaseRoute} from "@/components/Router/type";

export const baseRoutes: BaseRoute[] = [
    {
        path: "/dashboard",
        name: "dashboard",
        element: <></>,
        meta: {
            hidden: false,
            title: "工作台",
            icon: <DashboardFilled/>,
        },
    },
    {
        path: "/system",
        name: "system",
        meta: {
            hidden: false,
            title: "系统设置",
            icon: <SettingOutlined/>,
        },
        children: [
            {
                path: '/system/users',
                element: <></>,
                name: 'users',
                meta: {
                    hidden: false,
                    title: '人员管理'
                }
            },
            {
                path: '/system/roles',
                element: <></>,
                name: 'roles',
                meta: {
                    hidden: false,
                    title: '角色管理'
                }
            },
            {
                path: '/system/menus',
                element: <></>,
                name: 'menus',
                meta: {
                    hidden: false,
                    title: '菜单管理'
                }
            },
        ]
    },
    {
        path: "/utils",
        name: "utils",
        meta: {
            hidden: false,
            title: "系统工具",
            icon: <RadiusSettingOutlined/>,
        },
        children: [
            {
                path: '/utils/dicts',
                element: <></>,
                name: 'dict',
                meta: {
                    hidden: false,
                    title: '数据字典'
                }
            }
        ]
    },
];