import React, {
    Suspense,
} from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { routes } from "@/components/Router/router"

const RouterComponent: React.FC = () => {

    const router = createBrowserRouter(routes);

    return (
        <>
            <Suspense fallback={<></>}>
                <RouterProvider router={router}/>
            </Suspense>
        </>
    );

}

export default RouterComponent;