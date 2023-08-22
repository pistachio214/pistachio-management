import {Button, Result} from "antd";
import {memo} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "@/redux/hook";

import {setTabs, setActiveKey} from "@/redux/slice/tab"
import {Tab} from "@/redux/types/Tab";

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
        sessionStorage.clear();
        navigate("/dashboard");
    };
    return (
        <>
            <Result
                style={{margin: "auto"}}
                status="404"
                title="404"
                subTitle="抱歉，您访问的页面不存在。"
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