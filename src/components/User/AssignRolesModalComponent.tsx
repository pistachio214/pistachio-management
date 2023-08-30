import React, { useEffect, useState } from "react";
import { Form, Modal, Select } from "antd";

import { AssignRoles } from "@/types/user";
import { OptionsInterface } from "@/types/common";
import { SysRole } from "@/types/role";
import { getRoleAll } from "@/api/role";
import { permRole } from "@/api/user";

interface IProps {
    isVisible: boolean
    closeModal: () => void
    assignRoles?: AssignRoles
}

const AssignRolesModalComponent: React.FC<IProps> = (props: IProps) => {
    const [form] = Form.useForm();
    const [keys, setKeys] = useState<string[]>([]);
    const [selectOption, setSelectOption] = useState<OptionsInterface[]>([]);

    useEffect(() => {
        initChildren();

        initAssignRoles()
    }, [props.isVisible]);  // eslint-disable-line react-hooks/exhaustive-deps

    const initAssignRoles = () => {
        const {assignRoles, isVisible} = props;
        let key: string[] = [];
        if (isVisible && assignRoles?.id !== 0) {
            assignRoles?.sysRoles.forEach((item: SysRole) => {
                key.push(item.id.toString());
            })

            setKeys(key)
        }
    }

    const initChildren = () => {
        getRoleAll({size: 9999, status: 1}).then(res => {
            const {data} = res.data;

            let option: OptionsInterface[] = [];
            data.content.forEach((item: SysRole, index: number) => {
                option.push({label: item.name, value: item.id.toString()})
            })

            setSelectOption(option);
        })
    }

    const handleOk = () => {
        permRole(props.assignRoles?.id!, keys).then(() => {
            props.closeModal();
        });
    }

    const handleCancel = () => {
        props.closeModal();
    }

    const handleChange = (value: string[]) => {
        console.log(value)
        value.forEach((item: string) => {
            console.log(`selected ${item}`);
        })

        setKeys(value);
    }

    return (
        <>
            <Modal
                title={"分配角色"}
                open={props.isVisible}
                onCancel={() => handleCancel()}
                onOk={() => handleOk()}
                getContainer={false}
            >
                <Form
                    name="edit-role-menu"
                    form={form}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 20}}
                    labelAlign="left"
                    autoComplete="off"
                >
                    <Form.Item label={'用户角色'}>
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Please select"
                            value={keys}
                            onChange={handleChange}
                            options={selectOption}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

AssignRolesModalComponent.defaultProps = {
    isVisible: false,
    assignRoles: {id: 0, sysRoles: []}
}

export default AssignRolesModalComponent;