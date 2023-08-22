import React, {
    Suspense,
} from "react";
import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import {BeforeRouter} from "@/components/Router/guard";

import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Dict from "@/pages/System/Dicts"


import NonExistent from "@/pages/Error";

const RouterComponent: React.FC = () => {

    return (
        <>
            <Suspense fallback={<></>}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Navigate to={'/dashboard'}/>}/>
                        <Route path='/login' element={<Login/>}/>

                        <Route path={'/'} element={<Layout/>}>
                            <Route path={"/"} element={<BeforeRouter />}>
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