import React, {
    Suspense, useEffect, useState,
} from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { shallowEqual } from "react-redux";

import { generateRouteObject, getDefaultRouteObject } from "@/components/Router/router"
import { UserNavsType, UserState } from "@/redux/types/User";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { RouteObject } from "react-router";


const RouterComponent: React.FC = () => {

    const userState: UserState = useAppSelector((state: RootState) => ({...state.user}), shallowEqual);

    const [data, setDate] = useState<RouteObject[]>(() => getDefaultRouteObject());

    useEffect(() => {
        console.log('data list= ', data)
        console.log("route list= ", userState.nav)

        const defaultRouterObject: UserNavsType[] = userState.nav;

        const newData: RouteObject[] = generateRouteObject(defaultRouterObject);

        console.log("defaultRouterObject = ", defaultRouterObject)
        console.log("newData = ", newData)

        setDate(newData);
    }, [userState.nav]) // eslint-disable-line

    const generateRoutes = () => {
        return data.length > 0 ? data : getDefaultRouteObject();
    }

    return (
        <>
            <Suspense fallback={<></>}>
                <RouterProvider
                    router={createBrowserRouter(generateRoutes())}
                    fallbackElement={<>正在处理中.......</>}
                />
            </Suspense>
        </>
    );

}

export default RouterComponent;