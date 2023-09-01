import React from "react";
import * as Icon from '@ant-design/icons';
import { RouteObject } from "react-router";

import { BaseRoute } from "@/components/Router/type";
import { AuthorNavsType, RouteReactNode } from "@/types/common";

import { BeforeRouterComponent } from "@/components/Router/BeforeRouterComponent";

import NonExistent from "@/pages/error";
import Login from "@/pages/login";

import LayoutComponent from "@/components/Layout/LayoutComponent";
import RouteNodeMap from "@/components/Router/RouteMap";


const iconBC = (name?: string) => {

    if (name !== null && name !== undefined && name.length > 0) {
        return React.createElement((Icon && Icon as any)[name]);
    }

    return undefined;
}

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

export const generateBaseRoutes = (data: AuthorNavsType[]): BaseRoute[] => {
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

export const generateRouteObject = (data: AuthorNavsType[]): RouteObject[] => {
    let baseRouteArray = generateBaseRoutes(data);
    return insertObjectBeforePath(baseRouteArray);
}

const generateMetaHidden = (data: AuthorNavsType) => {
    let component = getComponent(data.component);

    return component === undefined && data.children === undefined;
}

// 新的数据要插入到path为*的前面
const insertObjectBeforePath = (newObj: BaseRoute[]): RouteObject[] => {
    let data: RouteObject[] = getDefaultRouteObject();

    const index = data.findIndex(obj => obj.path === "*");

    let newRouteObject = {
        element: <BeforeRouterComponent/>,
        children: [
            {
                path: '/',
                name: 'layout',
                element: <LayoutComponent/>,
                children: newObj
            }
        ]
    };

    if (index === -1) {
        // 如果数组中不存在 path 属性值为 * 的对象，则直接将新对象添加到数组末尾
        return [...data, newRouteObject];
    } else {
        // 如果数组中存在 path 属性值为 * 的对象，则在该对象之前插入新对象
        return [...data.slice(0, index), newRouteObject, ...data.slice(index)];
    }
}

export const getDefaultRouteObject = (): RouteObject[] => {
    return [
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: "*",
            element: <NonExistent/>
        }
    ];
}