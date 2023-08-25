import React, {useEffect} from "react";
import {Modal, Form, Input, InputNumber} from 'antd';
import {AxiosResponse} from "axios";

import {dictItemEdit, dictItemInfo, dictItemSave} from "@/api/dict";
import {SysDictItem} from "@/types/dict";

interface IProps {
    id: number
    isEdit: boolean
    dictId: number
    type: string
    isVisible: boolean
    closeModal: () => void
}

const DictItemSaveModalComponent: React.FC<IProps> = (props: IProps) => {

    const [form] = Form.useForm();

    useEffect(() => {
        const {id, isEdit, isVisible} = props;

        if (isEdit && isVisible && id !== 0) {
            //编辑
            dictItemInfo(props.id!).then((res: AxiosResponse<SysDictItem>) => {
                form.setFieldsValue(res.data);
            })
        } else {
            if (isVisible) {
                form.resetFields();
                form.setFieldsValue({dictId: props.dictId, type: props.type});
            }

        }

    }, [props.dictId, props.isVisible]);  // eslint-disable-line react-hooks/exhaustive-deps

    const handleCancel = () => {
        props.closeModal()
    }

    const handleOk = () => {
        if (!props.isEdit) {
            dictItemSave(form.getFieldsValue()).then(() => {
                handleCancel()
            })
        } else {
            dictItemEdit(form.getFieldsValue()).then(() => {
                handleCancel()
            })
        }
    }


    return (
        <>
            <Modal
                title={`字典项`}
                open={props.isVisible}
                onCancel={() => handleCancel()}
                onOk={() => form.submit()}
                getContainer={false}
            >
                <Form
                    name="save-dicts-item"
                    form={form}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 20}}
                    labelAlign="right"
                    onFinish={() => handleOk()}
                    autoComplete="off"
                >

                    <Form.Item name="id" hidden={true}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="dictId" hidden={true}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="类型"
                        name="type"
                        rules={[
                            {required: true, message: '请输入类型!'}
                        ]}
                    >
                        <Input disabled={true} placeholder="请输入类型"/>
                    </Form.Item>

                    <Form.Item
                        label="标签名"
                        name="label"
                        rules={[
                            {required: true, message: '请输入标签名!'}
                        ]}
                    >
                        <Input placeholder="请输入标签名"/>
                    </Form.Item>


                    <Form.Item
                        label="数据值"
                        name="value"
                        rules={[
                            {required: true, message: '请输入数据值!'}
                        ]}
                    >
                        <Input placeholder="请输入数据值"/>
                    </Form.Item>

                    <Form.Item
                        label="描述"
                        name="description"
                        rules={[
                            {required: true, message: '请输入描述!'}
                        ]}
                    >
                        <Input placeholder="请输入描述"/>
                    </Form.Item>

                    <Form.Item
                        label="排序"
                        name="sort"
                        initialValue={1}
                        rules={[
                            {required: true, message: '请输入排序!'}
                        ]}
                    >
                        <InputNumber style={{width: '100%'}} min={1} max={100} keyboard={true} placeholder="排序号"/>
                    </Form.Item>

                    <Form.Item
                        label="备注"
                        name="remarks"
                    >
                        <Input.TextArea rows={5} placeholder="请输入备注"/>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default DictItemSaveModalComponent;