import React from "react";
import { shallowEqual } from "react-redux";

import { Dropdown, Button, Popconfirm } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { IOperator, IOperatorProps } from "@/types/operator";
import { MenuState } from "@/redux/types/Menu";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/hook";
import { OperatorContainer } from "@/components/ActionOperator/style";
import UuidUtil from "@/utils/UuidUtil";
import AuthUtil from "@/utils/AuthUtil";
import { ItemType } from "antd/es/menu/hooks/useItems";

const ActionOperatorComponent: React.FC<IOperatorProps> = (props: IOperatorProps) => {
    const userStateMap: MenuState = useAppSelector((state: RootState) => ({...state.user}), shallowEqual);
    const authoritys: string[] = userStateMap.authoritys;

    const generatorMenuAuthItems = (items?: IOperator[]) => {
        let operatorAuthItems: IOperator[] = [];

        if (items !== undefined && items.length > 0) {
            items.forEach((item: IOperator) => {
                if (item.permission === undefined) {
                    operatorAuthItems.push(item);
                } else {
                    if (AuthUtil.checkAuth(item.permission, authoritys)) {
                        operatorAuthItems.push(item);
                    }
                }
            })
        }

        return operatorAuthItems;
    }

    const genreateMenuMore = (itemOperator: IOperator[]) => {
        let db: ItemType[] = [];

        itemOperator.forEach((item: IOperator, index: number) => {
            let data: ItemType = {
                key: `menu-item-operator-${index}`,
                label: item.title,
                title: item.title,
                icon: item.icon,
                onClick: () => item.onClick !== undefined ? item.onClick() : null,
                disabled: item.disable,
                danger: item.danger
            }

            db.push(data);
        })

        return db;
    }

    const generateMenu = () => {
        let itemOperator = generatorMenuAuthItems(props.items!);
        if (itemOperator.length > 3) {
            return (
                <>
                    {
                        itemOperator.splice(0, 2).map((item: IOperator, index: number) => {
                            if (item.danger) {
                                return (
                                    <Popconfirm
                                        title={item.message}
                                        onConfirm={() => item.onClick !== undefined ? item.onClick() : null}
                                        key={UuidUtil.getUuiD(8)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            type="link"
                                            danger={item.danger}
                                            size='small'
                                        >
                                            {item.title}
                                        </Button>
                                    </Popconfirm>
                                )

                            }
                            return (
                                <Button type='link'
                                        size='small'
                                        icon={item.icon}
                                        onClick={() => item.onClick !== undefined ? item.onClick() : null}
                                        disabled={item.disable}
                                        danger={item.danger}
                                        key={`operator-btn-${UuidUtil.getUuiD(8)}`}
                                >
                                    {item.title}
                                </Button>
                            )
                        })
                    }
                    {
                        <Dropdown key={`dropdown-happy-operator-${UuidUtil.getUuiD(8)}`}
                                  trigger={['click']}
                                  menu={{items: genreateMenuMore(itemOperator)}}
                        >
                            <Button type='link' size='small' className="ant-dropdown-link"
                                    onClick={e => e.preventDefault()}>
                                更多 <DownOutlined/>
                            </Button>
                        </Dropdown>
                    }
                </>
            )
        } else {
            return (
                <>
                    {
                        itemOperator.map((item: IOperator, index: number) => {
                            if (item.danger) {
                                return <Popconfirm
                                    key={UuidUtil.getUuiD(8)}
                                    title={item.message}
                                    onConfirm={() => item.onClick !== undefined ? item.onClick() : null}
                                    // onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button
                                        type="link"
                                        size='small'
                                        icon={item.icon}
                                        danger={item.danger}
                                    >
                                        {item.title}
                                    </Button>
                                </Popconfirm>

                            }

                            return (
                                <Button type='link'
                                        size='small'
                                        icon={item.icon}
                                        onClick={() => item.onClick !== undefined ? item.onClick() : null}
                                        disabled={item.disable}
                                        danger={item.danger}
                                        key={UuidUtil.getUuiD(8)}
                                >
                                    {item.title}
                                </Button>
                            )
                        })
                    }

                </>
            )
        }
    }

    return (
        <OperatorContainer key={UuidUtil.getUuiD(8)}>
            {generateMenu()}
        </OperatorContainer>
    )
};

export default ActionOperatorComponent;