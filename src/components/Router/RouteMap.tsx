import React from "react";

import { RouteReactNode } from "@/types/common";

import Dict from "@/pages/developer/dict";
import Oper from "@/pages/developer/oper";
import Exception from "@/pages/developer/exception";

import Dashboard from "@/pages/dashboard";
import User from "@/pages/system/user";
import Role from "@/pages/system/role";
import Menu from "@/pages/system/menu";


const RouteNodeMap: RouteReactNode[] = [
    {key: "Dict", component: <Dict/>},
    {key: "Oper", component: <Oper/>},
    {key: "Exception", component: <Exception/>},

    {key: "Dashboard", component: <Dashboard/>},
    {key: "User", component: <User/>},
    {key: "Role", component: <Role/>},
    {key: "Menu", component: <Menu/>},

    /**
     * 下面添加更多的路由映射
     *  请一定要与后端返回的 key 对应
     */

];


export default RouteNodeMap;
