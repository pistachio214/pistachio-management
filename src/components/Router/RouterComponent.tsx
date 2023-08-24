import React, {
    Suspense,
} from "react";
import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import {BeforeRouterComponent} from "@/components/Router/BeforeRouterComponent";

import LayoutComponent from "@/components/Layout/LayoutComponent";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Dict from "@/pages/system/dict"

import NonExistent from "@/pages/error";

const RouterComponent: React.FC = () => {

    return (
        <>
            <Suspense fallback={<></>}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Navigate to={'/dashboard'}/>}/>
                        <Route path='/login' element={<Login/>}/>

                        <Route path={'/'} element={<LayoutComponent/>}>
                            <Route path={"/"} element={<BeforeRouterComponent/>}>
                                <Route path={'/dashboard'} element={<Dashboard/>}/>
                                <Route path={'/utils'}>
                                    <Route path={"/utils/dicts"} element={<Dict/>}/>
                                </Route>
                            </Route>

                        </Route>

                        <Route path={'*'} element={<NonExistent/>}/>
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </>
    );

}

export default RouterComponent;