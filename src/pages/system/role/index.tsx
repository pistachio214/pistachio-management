import React, { useState } from "react";
import { Badge, Button, Form, Input } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DeleteOutlined, EditOutlined, PartitionOutlined } from "@ant-design/icons";

import { RoleQuestionType, SysRole } from "@/types/role";
import { IOperator } from "@/types/operator";
import ActionOperatorComponent from "@/components/ActionOperator/ActionOperatorComponent";
import { deleteRole, getRoleList } from "@/api/role";
import PistachioTableComponent from "@/components/Table/PistachioTableComponent";
import RoleEditModalComponent from "@/components/Role/RoleEditModalComponent";
import AssignPermissionsModalComponent from "@/components/Role/AssignPermissionsModalComponent";

const Role: React.FC = () => {

    const [params, setParams] = useState<RoleQuestionType>();

    const [editVisible, setEditVisible] = useState<boolean>(false);
    const [assignPermissionsVisible, setAssignPermissionsVisible] = useState<boolean>(false);

    const [id, setId] = useState<number>();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isRefresh, setIsRefresh] = useState<boolean>(false);

    const columns: ColumnsType<SysRole> = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: '角色名称',
            dataIndex: 'name',
            align: 'center',
        },
        {
            title: '唯一编码',
            dataIndex: 'code',
            align: 'center'
        },
        {
            title: '状态',
            dataIndex: 'status',
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
            title: '创建时间',
            dataIndex: 'createdAt',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record: SysRole) => {
                const item: IOperator[] = [
                    {
                        title: '分配权限',
                        icon: <PartitionOutlined/>,
                        permission: ['sys:role:perm'],
                        onClick: () => {
                            showAssignPermissionsModal(record.id);
                        }
                    },
                    {
                        title: '编辑',
                        icon: <EditOutlined/>,
                        permission: ['sys:role:update'],
                        onClick: () => {
                            showEditModal(record.id);
                        }
                    },
                ];

                if (record.id !== 1) {
                    item.push({
                        title: '删除',
                        danger: true,
                        message: `是否删除角色 [ ${record.name} ] ?`,
                        icon: <DeleteOutlined/>,
                        permission: ['sys:role:delete'],
                        onClick: () => {
                            handleDeleteRole(record.id);
                        }
                    })
                }
                return <ActionOperatorComponent items={item}/>
            },
        },
    ];

    const handleSearch = (values: {name: string, code: string}) => {
        setParams(values);
    }

    const handleDeleteRole = (id: number) => {
        deleteRole(id).then(() => {
            setIsRefresh(!isRefresh);
        })
    }

    const showEditModal = (id: number) => {
        setId(id);
        setIsEdit(true);
        setEditVisible(true);
    }

    const closeEditModal = () => {
        setIsRefresh(!isRefresh);
        setEditVisible(false);
    }

    const showAssignPermissionsModal = (id: number) => {
        setId(id);
        setAssignPermissionsVisible(true);
    }

    const closeAssignPermissionsModal = () => {
        setIsRefresh(!isRefresh);
        setAssignPermissionsVisible(false);
    }

    const searchRender = (
        <Form layout="inline" name="search-users" onFinish={(values) => handleSearch(values)}>
            <Form.Item name={'name'}>
                <Input placeholder="角色名称"/>
            </Form.Item>

            <Form.Item name={'code'}>
                <Input placeholder="唯一编码"/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    查询
                </Button>
            </Form.Item>
        </Form>
    );


    return (
        <>
            <PistachioTableComponent
                rowKey={(record: SysRole) => record.id}
                columns={columns}
                search={searchRender}
                url={getRoleList()}
                params={params}
                isVisible={isRefresh}
                quickJump={(page: number) => {
                    setParams({...params, ...{current: page}})
                }}
                reload={{
                    hasPremiss: ['sys:role:list'],
                }}
                plus={{
                    hasPremiss: ['sys:role:save'],
                    click: () => {
                        setIsEdit(false);
                        setEditVisible(true);
                    }
                }}
            />

            <RoleEditModalComponent
                isVisible={editVisible}
                closeModal={() => closeEditModal()}
                id={id}
                edit={isEdit}
            />

            <AssignPermissionsModalComponent
                id={id}
                isVisible={assignPermissionsVisible}
                closeModal={() => closeAssignPermissionsModal()}
            />
        </>
    )
}

export default Role;