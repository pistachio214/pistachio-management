import React from "react";
import {DashboardFilled, RadiusSettingOutlined} from "@ant-design/icons";
import {BaseRoute} from "@/components/router/index.d";

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