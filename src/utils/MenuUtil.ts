import { MenuProps } from "antd";
import { cloneDeep } from "lodash";
import { BaseRoute } from "@/components/Router/type";

export type MenuItem = Required<MenuProps>["items"][number];

//路由到Menu的映射
function getMenu(route: BaseRoute): MenuItem {
    return {
        key: route.path,
        icon: route.meta.icon,
        children: route.children?.map((e) => {
            return getMenu(e);
        }),
        title: route.meta.title,
        label: route.meta.title,
    } as MenuItem;
}

/**
 * 过滤需要隐藏的路由
 *   在一级没有设置children和element的情况下,该路由直接隐藏
 *   在children和element都设置的情况下,meta.hidden 就是决定性影响因子
 * @param routes
 */
export function filterToMenu(routes: BaseRoute[]): BaseRoute[] {
    const routeList = cloneDeep(routes)
    return routeList.filter((item) => {
        if (item.children && item.children.length > 0) {
            item.children = filterToMenu(item.children);
        } else {
            if (item.element === undefined) {
                return false;
            }
        }
        return item.meta?.hidden !== true;
    });
}


//根据传入路由表生成菜单
export function getMenus(routes: BaseRoute[]): MenuItem[] {
    return routes.map((item: BaseRoute) => {
        return getMenu(item);
    });
}


