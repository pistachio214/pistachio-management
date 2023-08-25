import React, {useEffect, useState} from "react";
import {Form, Modal, Input, Select} from "antd";
import {OptionsInterface} from "@/types/common";
import {editDict, findDict, getDictByKey, saveDict} from "@/api/dict";
import {AxiosResponse} from "axios";
import {SysDictListResponse, SysDictInfoResponse} from "@/types/dict";

interface IProps {
    id: number
    isEdit: boolean
    isVisible: boolean
    closeModal: () => void
}

const DictSaveModalComponent: React.FC<IProps> = (props: IProps) => {

    const [form] = Form.useForm();
    const [dictItem, setDictItem] = useState<OptionsInterface[]>([])

    useEffect(() => {
        const {id, isEdit, isVisible} = props;
        if (isEdit && isVisible && id !== 0) {
            //编辑
            findDict(id!).then((res: AxiosResponse<SysDictInfoResponse>) => {
                form.setFieldsValue({...res.data, ...{system: res.data.system}});
            })
        } else {
            if (isVisible) {
                form.resetFields();
            }
        }

        getDictByKey('dicts_type').then((res: AxiosResponse<SysDictListResponse>) => {
            if (res.data != null) {
                setDictItem(res.data.items);
            }

        })

    }, [props.id, props.isVisible]);  // eslint-disable-line react-hooks/exhaustive-deps

    const handleOk = () => {
        let request;
        if (props.isEdit) {
            request = editDict(form.getFieldsValue())
        } else {
            request = saveDict(form.getFieldsValue())
        }
        request.then(() => {
            handleCancel();
        })
    }

    const handleCancel = () => {
        props.closeModal();
    }

    return (
        <>
            <Modal
                title={props.isEdit ? "编辑字典" : "新增字典"}
                open={props.isVisible}
                onCancel={() => handleCancel()}
                onOk={() => form.submit()}
                getContainer={false}
            >

                <Form
                    name="save-dicts"
                    form={form}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 20}}
                    labelAlign="right"
                    onFinish={() => handleOk()}
                    autoComplete="off"
                >

                    {
                        props.isEdit ?
                            <Form.Item name="id" hidden={true}>
                                <Input/>
                            </Form.Item>
                            :
                            <></>
                    }

                    <Form.Item
                        label="类型标识"
                        name="type"
                        rules={[
                            {required: true, message: '请输入类型标识!'}
                        ]}
                    >
                        <Input placeholder="请输入类型标识"/>
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
                        label="字典类型"
                        name="system"
                        rules={[
                            {required: true, message: '请输入字典类型!'}
                        ]}
                        initialValue={"1"}
                    >
                        <Select options={dictItem}/>
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

DictSaveModalComponent.defaultProps = {
    isVisible: false,
    isEdit: false,
}

export default DictSaveModalComponent;