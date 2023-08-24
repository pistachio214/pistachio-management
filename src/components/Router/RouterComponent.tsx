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

import NonExistent from "@/pages/error";
import Login from "@/pages/login";

import LayoutComponent from "@/components/Layout/LayoutComponent";

import Dashboard from "@/pages/dashboard";
import Dict from "@/pages/system/dict"
import User from "@/pages/system/user";
import Role from "@/pages/system/role";
import Menu from "@/pages/system/menu";

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
                                <Route path={"/utils/dicts"} element={<Dict/>}/>
                                <Route path={"/system/users"} element={<User/>}/>
                                <Route path={"/system/roles"} element={<Role/>}/>
                                <Route path={"/system/menus"} element={<Menu/>}/>
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