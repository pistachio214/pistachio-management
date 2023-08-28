import { useUpdate } from "ahooks";
import { Row, Spin } from "antd";
import React, { Suspense, memo, useEffect, useRef, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { reload } from "@/redux/slice/tab"
import { RootState } from "@/redux/store";

interface IProps {
    tabs: {
        key: string;
        label: string;
    }[];
}

const KeepAliveComponent: React.FC<IProps> = (props: IProps) => {

    const componentList = useRef(new Map());
    const activeKey = useAppSelector((state: RootState) => state.tab.activeKey);
    const loading = useAppSelector((state: RootState) => state.tab.loading);

    const outLet = useOutlet();
    const {pathname} = useLocation();

    const dispatch = useAppDispatch();
    const forceUpdate = useUpdate();

    const [endloading, setEndLoading] = useState(false);
    useEffect(() => {
        if (!componentList.current.has(pathname)) {
            componentList.current.set(pathname, outLet);
        }
        forceUpdate();
        // eslint-disable-next-line
    }, [pathname, endloading, activeKey]);
    useEffect(() => {
        componentList.current.forEach((_value, key) => {
            if (!props.tabs.some((tab) => tab.key === key)) {
                componentList.current.delete(key);
            }
        });

        forceUpdate();
        // eslint-disable-next-line
    }, [props.tabs]);
    useEffect(() => {
        if (loading) {
            componentList.current.delete(pathname);
            setEndLoading((pre) => !pre);
            dispatch(reload(false));
        }
        // eslint-disable-next-line
    }, [loading]);
    return (
        <div>
            {Array.from(componentList.current).map(([key, component]) => (
                <div key={key} style={{display: pathname === key ? "block" : "none"}}>
                    <Suspense
                        fallback={
                            <SpinContainer justify={"center"} align={"middle"}>
                                <Spin size="large"></Spin>
                            </SpinContainer>
                        }
                    >
                        {component}
                    </Suspense>
                </div>
            ))}
        </div>
    );
}
const SpinContainer = styled(Row)`
  height: 60vh;
`;

KeepAliveComponent.defaultProps = {
    tabs: [],
}

export default memo(KeepAliveComponent);
