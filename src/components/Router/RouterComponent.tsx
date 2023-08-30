import React, {
    Suspense,
} from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { generateRoutes } from "@/components/Router/router"

const RouterComponent: React.FC = () => {

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