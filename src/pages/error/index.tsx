import { Button, Result } from "antd";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hook";

import { setTabs, setActiveKey } from "@/redux/slice/tab"
import { Tab } from "@/redux/types/Tab";
import defaultSettings from "@/defaultSettings";
import { clearUserState } from "@/redux/slice/user";

/**
 * 404页面
 */
const NonExistent = memo(() => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const goHome = () => {
        let setTabPayload: Tab[] = [
            {
                key: "/dashboard",
                label: "工作台",
                isMenu: true
            },
        ];

        dispatch(setTabs(setTabPayload));
        dispatch(setActiveKey("/dashboard"))

        const token = sessionStorage.getItem("tokenValue")

        if (token) {
            navigate("/dashboard", {replace: true});
        } else {
            sessionStorage.clear();
            dispatch(clearUserState());

            navigate("/login", {replace: true});
        }
    };

    return (
        <>
            <Result
                style={{margin: "auto"}}
                status="500"
                title="500"
                subTitle={defaultSettings.notfoundTitle}
                extra={
                    <Button type="primary" onClick={goHome}>
                        回到系统
                    </Button>
                }
            />
        </>
    );
});


export default NonExistent;