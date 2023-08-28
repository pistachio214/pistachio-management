import React, { useEffect, useState } from "react";
import { Badge, Button, Table } from 'antd';
import { ColumnsType } from "antd/lib/table";
import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { AxiosResponse } from "axios";
import { message } from "@/components/Antd/EscapeAntd";

import { SysMenu } from "@/types/menu";
import { IOperator } from "@/types/operator";
import ActionOperatorComponent from "@/components/ActionOperator/ActionOperatorComponent";
import { delMenu, getMenuList } from "@/api/menu";
import { MenuContainer } from "@/pages/system/menu/style";
import AuthWrapper from "@/components/AuthHoc/AuthWrapper";
import MenuEditModalComponent from "@/components/Menu/MenuEditModalComponent";
import { Response } from "@/types/common";

const Menu: React.FC = () => {

    const [data, setData] = useState<SysMenu[]>();
    const [isRef, setIsRef] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
    const [editMenu, setEditMenu] = useState<SysMenu>();
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const columns: ColumnsType<SysMenu> = [
        {
            title: '名称',
            dataIndex: 'name',
            align: 'left'
        },
        {
            title: '权限编码',
            dataIndex: 'perms',
            align: 'center',
        },
        {
            title: '图标',
            dataIndex: 'icon',
            align: 'center',
        },
        {
            title: '类型',
            dataIndex: 'type',
            width: '80px',
            align: 'center',
            render: (type: number) => {
                switch (type) {
                    case 0:
                        return <Button type="primary" ghost={true} size="small">目录</Button>
                    case 1:
                        return <Button type="default" ghost={true} className="menu-type-button-success"
                                       size="small">菜单</Button>
                    case 2:
                        return <Button type="default" ghost={true} className="menu-type-button-info"
                                       size="small">按钮</Button>
                    default:
                        return <Button type="default" ghost={true} danger={true} size="small">未知</Button>
                }
            }
        },
        {
            title: '菜单URL',
            dataIndex: 'path',
            align: 'center',
        },
        {
            title: '序号',
            dataIndex: 'orderNum',
            width: '80px',
            align: 'center',
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: '80px',
            align: 'center',
            render: (status: number) => {
                let dom: React.ReactNode;

                switch (status) {
                    case 1:
                        dom = <Badge status="success" text='启用'/>
                        break;
                    case 0:
                        dom = <Badge status='default' text='禁用'/>
                        break;
                    default:
                        dom = <Badge status='error' text='未知'/>
                }
                return dom;
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record: SysMenu) => {
                const item: IOperator[] = [
                    {
                        title: '编辑',
                        icon: <EditOutlined/>,
                        permission: ['sys:menu:update'],
                        onClick: () => {
                            showEditModal(record);
                        }
                    },
                    {
                        title: '删除',
                        danger: true,
                        message: `是否删除 [ ${record.name} ] ?`,
                        icon: <DeleteOutlined/>,
                        permission: ['sys:menu:delete'],
                        onClick: () => {
                            handleDeleteMenu(record.id);
                        }
                    }
                ];
                return <ActionOperatorComponent items={item}/>
            },
        },
    ];

    useEffect(() => {
        initUseEffect();
    }, [isRef]);  // eslint-disable-line react-hooks/exhaustive-deps

    const initUseEffect = () => {
        setIsLoading(true);
        getMenuList().then((res: AxiosResponse<Response<{list: SysMenu[]}>>) => {
            const {data} = res.data;

            setData(generatorMenuTree(data.list));
            setIsLoading(false);
        })
    }

    const generatorMenuTree = (data: SysMenu[]) => {
        data.forEach((item: SysMenu, index: number) => {
            if (item.children && item.children.length > 0) {
                generatorMenuTree(item.children)
            } else {
                item.children = undefined;
            }
        })

        return data;
    }

    const handleDeleteMenu = (id: number) => {
        delMenu(id).then(() => {
            message.success(`删除成功!`, 1, () => {
                setIsRef(!isRef);
            })
        })
    }

    const showEditModalAdd = () => {
        setIsEdit(false);
        setIsEditModalVisible(true);
    }

    const showEditModal = (menuInfo: SysMenu) => {
        setIsEdit(true);
        setEditMenu(menuInfo);
        setIsEditModalVisible(true);
    }

    const closeEditModal = () => {
        setIsRef(!isRef);
        setIsEditModalVisible(false);
    }

    const refRelease = () => {
        setIsRef(!isRef);
    }

    return (
        <MenuContainer>
            <div className="action-container">
                <div className="common-btn-container">
                    <AuthWrapper hasPermiss={['sys:menu:list']}>
                        <Button
                            type="primary"
                            icon={<ReloadOutlined/>}
                            onClick={() => refRelease()}
                        >
                            刷新
                        </Button>
                    </AuthWrapper>

                    <AuthWrapper hasPermiss={['sys:menu:save']}>
                        <Button
                            icon={<PlusOutlined/>}
                            onClick={() => showEditModalAdd()}
                        >
                            新增
                        </Button>
                    </AuthWrapper>

                </div>
            </div>

            <Table
                rowKey={(record: SysMenu) => record.id}
                columns={columns}
                dataSource={data}
                scroll={{y: 600}}
                loading={isLoading}
            />

            <MenuEditModalComponent
                isVisible={isEditModalVisible}
                closeModal={() => closeEditModal()}
                menuInfo={editMenu}
                menuList={data}
                edit={isEdit}
            />
        </MenuContainer>
    );
};

export default Menu;