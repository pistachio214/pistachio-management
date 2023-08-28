import React, { useState } from "react";
import { Form, Avatar, Image, Badge, Tag, Input, Button, } from "antd";
import { ColumnsType } from "antd/lib/table";
import {
    PartitionOutlined,
    RedoOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { AxiosResponse } from "axios";
import { message } from "@/components/Antd/EscapeAntd";

import { AssignRoles, SysUser, UserQuestionType } from "@/types/user";
import defaultSettings from "@/defaultSettings";
import { SysRole } from "@/types/role";
import { Response } from "@/types/common";
import { UserRoleContainer } from "@/pages/system/user/style";
import { IOperator } from "@/types/operator";
import ActionOperatorComponent from "@/components/ActionOperator/ActionOperatorComponent";
import { delUser, getUserList, restPassword } from "@/api/user";
import PistachioTableComponent from "@/components/Table/PistachioTableComponent";
import AssignRolesModalComponent from "@/components/User/AssignRolesModalComponent";
import UserCreateModalComponent from "@/components/User/UserCreateModalComponent";

const User: React.FC = () => {

    const [form] = Form.useForm();

    const [params, setParams] = useState<UserQuestionType>();
    const [isAssignRolesVisible, setIsAssignRolesVisible] = useState<boolean>(false);
    const [isCreateUserVisible, setIsCreateUserVisible] = useState<boolean>(false);
    const [assignRoles, setAssignRoles] = useState<AssignRoles>();

    const [isRefresh, setIsRefresh] = useState<boolean>(false);

    const columns: ColumnsType<SysUser> = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            align: 'center',
            render: (avatar: string) => {
                return <Avatar src={
                    <Image
                        src={avatar}
                        style={{width: 32}}
                        onError={
                            (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                event.currentTarget.src = defaultSettings.userAvatar;
                                console.log(event)
                            }}
                    />}
                />
            }
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
            align: 'center'
        },
        {
            title: '用户名',
            dataIndex: 'username',
            align: 'center'
        },
        {
            title: '角色名称',
            dataIndex: 'sysRoles',
            align: 'center',
            render: (sysRoles: SysRole[]) => {
                return (
                    <UserRoleContainer>
                        {
                            sysRoles.map((item: SysRole, index: number) => {
                                return <Tag key={`role-info-key-${index}`} color="#2db7f5">{item.name}</Tag>
                            })
                        }
                    </UserRoleContainer>
                )
            }
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            align: 'center'
        },
        {
            title: '状态',
            dataIndex: 'status',
            align: 'center',
            render: (status: number) => {
                let render: React.ReactNode;

                switch (status) {
                    case 1:
                        render = <Badge status="success" text='启用'/>
                        break;
                    case 0:
                        render = <Badge status='default' text='禁用'/>
                        break;
                    default:
                        render = <Badge status='error' text='未知'/>
                }
                return render;
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
            render: (text, record: SysUser) => {
                const item: IOperator[] = [
                    {
                        title: '分配角色',
                        icon: <PartitionOutlined/>,
                        permission: ['sys:user:role'],
                        onClick: () => {
                            showAssignRolesModal(record.id, record.sysRoles);
                        }
                    },
                    {
                        title: '重置密码',
                        icon: <RedoOutlined/>,
                        permission: ['sys:user:repass'],
                        onClick: () => {
                            handleResetPassword(record.id);
                        }
                    }
                ];

                if (record.id !== 1) {
                    item.push({
                        title: '删除',
                        danger: true,
                        icon: <DeleteOutlined/>,
                        permission: ['sys:user:delete'],
                        message: `是否删除该用户 [ ${record.username} ] ?`,
                        onClick: () => {
                            handleDeleteUser(record.id);
                        }
                    })
                }

                return (
                    <ActionOperatorComponent items={item}/>
                )
            },
        },
    ];

    const showAssignRolesModal = (id: number, sysRoles: SysRole[]) => {
        setAssignRoles({id: id, sysRoles: sysRoles})
        setIsAssignRolesVisible(true);
    }

    const closeAssignRoleModal = () => {
        setIsRefresh(!isRefresh);
        setIsAssignRolesVisible(false);
    }

    const showCreateUserModal = () => {
        setIsCreateUserVisible(true);
    }

    const closeCreateUserModal = () => {
        setIsRefresh(!isRefresh);
        setIsCreateUserVisible(false);
    }

    const handleResetPassword = (id: number) => {
        restPassword(id).then((res: AxiosResponse<Response<string>>) => {
            message.success(`密码初始化成功! 初始化密码为: ${res.data}`)
        })
    }

    const handleDeleteUser = (id: number) => {
        delUser(id).then(res => {
            message.success(`删除管理员成功!`)
            setIsRefresh(!isRefresh);
        })
    }

    const handleSearch = (values: {username: string}) => {
        setParams(values);
    }

    const searchRender = (
        <Form form={form} layout="inline" name="search-users" onFinish={(values) => handleSearch(values)}>
            <Form.Item name={'username'}>
                <Input placeholder="用户名"/>
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
                rowKey={(record: SysUser) => record.id}
                columns={columns}
                search={searchRender}
                url={getUserList()}
                isVisible={isRefresh}
                params={params}
                plus={{
                    hasPremiss: ['sys:user:save'],
                    click: () => showCreateUserModal()
                }}
                reload={{
                    hasPremiss: ['sys:user:list']
                }}
                quickJump={(page: number) => {
                    setParams({...params, ...{current: page}})
                }}
            />

            <AssignRolesModalComponent
                isVisible={isAssignRolesVisible}
                assignRoles={assignRoles}
                closeModal={() => closeAssignRoleModal()}
            />

            <UserCreateModalComponent
                isVisible={isCreateUserVisible}
                closeModal={() => closeCreateUserModal()}
            />

        </>
    )
}

export default User;