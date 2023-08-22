/**
 * @description 路由工具函数
 */

import {BaseRoute} from "@/components/router/index.d";
import {matchPath} from "react-router-dom";

export const getRoute = (
    path: string,
    routes: BaseRoute[]
): BaseRoute | undefined => {
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        // 使用react-router-dom的matchPath方法对route里的path和传入的path进行匹配
        if (route.meta.hidden) {
            const match = matchPath({path: route.path, end: false}, path);
            if (match) {
                return {...route, path: match.pathname};
            }
        }
        if (route.path === path) {
            return route;
        }
        if (route.children) {
            const foundObject = getRoute(path, route.children);
            if (foundObject) {
                return foundObject;
            }
        }
    }

    return undefined;
};
