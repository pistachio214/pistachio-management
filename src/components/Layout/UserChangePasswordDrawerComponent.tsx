import React, { useEffect } from "react";
import {
    Button, Col, Drawer, Form,
    Input, Row, Space
} from 'antd';

import { UserChangePasswordRequest } from "@/types/user";
import { RuleObject, StoreValue } from "rc-field-form/lib/interface";
import { changeUserPassword } from "@/api/user";
import { message } from "@/components/Antd/EscapeAntd";


interface IProps {
    open: boolean,
    onClose: () => void,
    changeSuccess: () => void
}

const UserChangePasswordDrawerComponent: React.FC<IProps> = (props: IProps) => {

    const [form] = Form.useForm();

    useEffect(() => {
        if (props.open) {
            form.resetFields();
        }
    }, [props.open]) // eslint-disable-line

    const validateConfirmPassword = (_: RuleObject, value: StoreValue) => {
        let newPassword: string = form.getFieldValue("newPassword")
        if (newPassword !== value.toString()) {
            return Promise.reject(new Error('两次输入的密码不相同!'));
        }

        return Promise.resolve();
    }

    const onFinish = (values: UserChangePasswordRequest) => {
        changeUserPassword(values).then(() => {
            message.success("修改成功,请重新登录");
            props.changeSuccess();
        })
    }

    return (
        <>
            <Drawer
                title="管理员信息"
                width={500}
                onClose={() => props.onClose()}
                open={props.open}
                bodyStyle={{paddingBottom: 80}}
                getContainer={false}
                extra={
                    <Space>
                        <Button onClick={() => props.onClose()}>关闭</Button>
                        <Button onClick={() => form.submit()} type="primary">
                            更新
                        </Button>
                    </Space>
                }
            >
                <Form
                    layout="vertical"
                    name={'user-change-password-drawer-from'}
                    form={form}
                    autoComplete="off"
                    onFinish={(values: UserChangePasswordRequest) => onFinish(values)}
                >

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="oldPassword"
                                label="原密码"
                                rules={[
                                    {required: true, message: '请输入原密码'},
                                    {min: 8, message: "密码长度最小8位"},
                                    {max: 18, message: "密码长度最大18位"}
                                ]}
                            >
                                <Input.Password allowClear placeholder="请输入原密码"/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="newPassword"
                                label="新密码"
                                rules={[
                                    {required: true, message: '请输入新密码'},
                                    {min: 8, message: "密码长度最小8位"},
                                    {max: 18, message: "密码长度最大18位"}
                                ]}
                            >
                                <Input.Password allowClear placeholder="请输入新密码"/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="confirmPassword"
                                label="重复新密码"
                                rules={[
                                    {required: true, message: '再次输入新密码'},
                                    {min: 8, message: "密码长度最小8位"},
                                    {max: 18, message: "密码长度最大18位"},
                                    {validator: validateConfirmPassword},
                                ]}
                            >
                                <Input.Password allowClear placeholder="请输入新密码"/>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Drawer>
        </>
    );
}

UserChangePasswordDrawerComponent.defaultProps = {
    open: false,
    onClose: () => {
    },
}


export default UserChangePasswordDrawerComponent;