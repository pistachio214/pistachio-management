import React, {
    Suspense, useEffect, useState,
} from "react";
import { RouteObject } from "react-router";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { shallowEqual } from "react-redux";
import { Spin } from "antd";

import { generateRouteObject, getDefaultRouteObject } from "@/components/Router/router"
import { UserNavsType, UserState } from "@/redux/types/User";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";

const RouterComponent: React.FC = () => {

    const userState: UserState = useAppSelector((state: RootState) => ({...state.user}), shallowEqual);

    const initDefaultRouteObject = (): RouteObject[] => {
        const defaultRouterObject: UserNavsType[] = userState.nav;
        const newData: RouteObject[] = generateRouteObject(defaultRouterObject);

        return newData.length > 0 ? newData : getDefaultRouteObject();
    }

    const [data, setDate] = useState<RouteObject[]>(() => initDefaultRouteObject());

    useEffect(() => {
        const newData: RouteObject[] = initDefaultRouteObject();
        setDate(newData);
    }, [userState.nav]) // eslint-disable-line

    const generateRoutes = () => {
        return data.length > 0 ? data : getDefaultRouteObject();
    }

    return (
        <>
            <Suspense fallback={<Spin/>}>
                <RouterProvider
                    router={createBrowserRouter(generateRoutes())}
                    fallbackElement={<Spin/>}
                />
            </Suspense>
        </>
    );

}

export default RouterComponent;