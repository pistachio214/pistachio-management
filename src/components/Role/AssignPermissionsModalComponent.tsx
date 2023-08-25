import React, {useEffect, useState} from "react";
import {Modal, Form, Tree} from 'antd';
import {AxiosResponse} from "axios";
import {Key} from "rc-table/lib/interface";

import {MenuTreeNodesType, SysMenu} from "@/types/menu";
import {findRoleById, permRole} from "@/api/role";
import {SysRole} from "@/types/role";
import {getMenuList} from "@/api/menu";
import {message} from "@/components/Antd/EscapeAntd";

interface IProps {
    id: number | undefined
    isVisible: boolean
    closeModal: () => void
}

const AssignPermissionsModalComponent: React.FC<IProps> = (props: IProps) => {

    const [form] = Form.useForm();
    const [nodes, setNodes] = useState<MenuTreeNodesType[] | undefined>();
    const [checkedKeys, setCheckedKeys] = useState<number[]>([]);

    useEffect(() => {
        const initSelected = () => {
            const {id, isVisible} = props;
            if (isVisible && id !== undefined && id) {
                findRoleById(id).then((res: AxiosResponse<SysRole>) => {
                    let checkedKey: number[] = [];
                    res.data.menuIds.forEach((item: number) => {
                        checkedKey.push(item);
                    })
                    setCheckedKeys(checkedKey);
                })
            } else {
                setCheckedKeys([]);
            }
        }
        initSelected();
    }, [props.isVisible]);  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        initMenuList();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    const initMenuList = async () => {
        await getMenuList().then(res => {
            let menuList: SysMenu[] = res.data.list;
            let treeData: MenuTreeNodesType[] = generatorMenuTreeData(menuList);
            setNodes(treeData);
        })
    }

    const generatorMenuTreeData = (data: SysMenu[]) => {
        let node: MenuTreeNodesType[] = [];
        data.forEach((item: SysMenu) => {
            if (item.children && item.children.length) {
                node.push({
                    title: item.name,
                    key: Number(item.id),
                    children: generatorMenuTreeData(item.children)
                })
            } else {
                node.push({
                    title: item.name,
                    key: Number(item.id),
                })
            }
        })
        return node;
    }

    const handleOk = () => {
        permRole(props.id!, checkedKeys).then((res: any) => {
            message.success(res.message)
            handleCancel()
        });
    }

    const handleCancel = () => {
        props.closeModal();
    }

    const onCheck = (checkedKeys: Key[] | { checked: Key[]; halfChecked: Key[]; }, info: any) => {
        let keys: number[] = [];
        info.checkedNodes.forEach((item: { key: string, title: string }) => {
            keys.push(Number(item.key));
        })
        setCheckedKeys(keys);
    };

    return (
        <>
            <Modal
                title={"分配权限"}
                open={props.isVisible}
                onCancel={() => handleCancel()}
                onOk={() => handleOk()}
                getContainer={false}
                width={800}
            >
                <Form
                    name="edit-role"
                    form={form}
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    labelAlign="left"
                    autoComplete="off"
                >
                    <Form.Item
                        label='权限选择'
                        name="menuIds"
                        rules={[
                            {required: true, message: '权限不能为空!'}
                        ]}
                    >
                        <Tree
                            checkable
                            showLine={true}
                            selectable={false}
                            checkedKeys={checkedKeys}
                            onCheck={onCheck}
                            treeData={nodes}
                            checkStrictly={false}
                            defaultExpandAll={true}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

AssignPermissionsModalComponent.defaultProps = {
    id: 0,
    isVisible: false,
}

export default AssignPermissionsModalComponent;