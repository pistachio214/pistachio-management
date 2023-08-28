import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Tabs } from "antd";
import { CloseOutlined, ReloadOutlined } from "@ant-design/icons";

import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { css } from "@emotion/css";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { reload, setActiveKey, setTabs } from "@/redux/slice/tab";
import { Tab } from "@/redux/types/Tab";

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
    "data-node-key": string;
    onActiveBarTransform: (className: string) => void;
}

//拖拽组件
const DraggableTabNode = ({
                              className,
                              onActiveBarTransform,
                              ...props
                          }: DraggableTabPaneProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isSorting,
    } = useSortable({
        id: props["data-node-key"],
    });

    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Transform.toString(transform),
        transition,
    };

    useEffect(() => {
        if (!isSorting) {
            onActiveBarTransform("");
        } else if (className?.includes("ant-tabs-tab-active")) {
            onActiveBarTransform(
                css`
                  .ant-tabs-ink-bar {
                    transform: ${CSS.Transform.toString(transform)};
                    transition: ${transition} !important;
                  }
                `
            );
        }
    }, [ className, isSorting, onActiveBarTransform, transform, transition ]);

    return React.cloneElement(props.children as React.ReactElement, {
        ref: setNodeRef,
        style,
        ...attributes,
        ...listeners,
    });
};

//RouterTabs组件

const RouterTabsComponent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const tabs = useAppSelector((state: RootState) => state.tab.tabs);
    const activeKey = useAppSelector((state: RootState) => state.tab.activeKey);
    const [ items, setItems ] = useState<{
        key: string;
        label: string;
    }[]>([]);
    const [ className, setClassName ] = useState("");
    const sensor = useSensor(PointerSensor, {
        activationConstraint: {distance: 10},
    });

    useEffect(() => {
        setItems(tabs);
        tabs.length === 1 ? setTabsType("card") : setTabsType("editable-card");
    }, [ tabs ]);

    const tabChange = (key: string) => {
        dispatch(setActiveKey(key));
    };

    useEffect(() => {
        navigate(activeKey);
        // eslint-disable-next-line
    }, [ activeKey ]);

    //拖拽结束
    const onDragEnd = ({active, over}: DragEndEvent) => {
        if (active.id !== over?.id) {
            setItems((prev) => {
                const activeIndex = prev.findIndex((i) => i.key === active.id);
                const overIndex = prev.findIndex((i) => i.key === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };

    //改变单个标签
    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: "add" | "remove"
    ) => {
        if (action === "remove") {
            const newItems: Tab[] = items.filter((item) => item.key !== targetKey);
            if (activeKey === targetKey) {
                dispatch(setActiveKey(newItems[newItems.length - 1].key))
                navigate(newItems[newItems.length - 1].key);
            }
            setItems(newItems);
            dispatch(setTabs(newItems));
        }
    };

    //控制按钮关闭状态
    const [ tabsType, setTabsType ] = useState<"editable-card" | "card">("card");

    //tab右侧的按钮
    const renderExtraContent = () => {
        return (
            <Row>
                <Button onClick={refresh}>
                    <ReloadOutlined/>
                </Button>
                <Button onClick={clearAll}>
                    <CloseOutlined/>
                </Button>
            </Row>
        );
    };

    const refresh = () => {
        dispatch(reload(true));
    };

    const clearAll = () => {
        dispatch(setTabs([ {key: "/home", label: "工作台"} ]));
        dispatch(setActiveKey("/home"));

        navigate("/home");
    };
    return (
        <Tabs
            style={{marginTop: 10, height: 32, display: 'none'}}
            type={tabsType}
            hideAdd
            className={className}
            items={items}
            activeKey={activeKey}
            onEdit={onEdit}
            onChange={tabChange}
            tabBarGutter={3}
            tabBarExtraContent={renderExtraContent()}
            renderTabBar={(tabBarProps, DefaultTabBar) => (
                <DndContext sensors={[ sensor ]} onDragEnd={onDragEnd}>
                    <SortableContext
                        items={items.map((i) => i.key)}
                        strategy={horizontalListSortingStrategy}
                    >
                        <DefaultTabBar {...tabBarProps}>
                            {(node) => (
                                <DraggableTabNode
                                    {...node.props}
                                    key={node.key}
                                    onActiveBarTransform={setClassName}
                                >
                                    {node}
                                </DraggableTabNode>
                            )}
                        </DefaultTabBar>
                    </SortableContext>
                </DndContext>
            )}
        />
    );
};

export default memo(RouterTabsComponent);
