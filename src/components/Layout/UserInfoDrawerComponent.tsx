import React, { useEffect, useState } from "react";
import {
    Button, Col, Drawer, Form,
    Input, Row, Space, Upload
} from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile, UploadProps, UploadChangeParam } from 'antd/es/upload';
import type { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';

import { currentUser, currentUserSave } from "@/api/user";
import { AxiosResponse } from "axios";
import { SysUser, UserInfoEditRequest } from "@/types/user";
import { Response } from "@/types/common";

import { message } from "@/components/Antd/EscapeAntd";
import { uploadImage } from "@/api/upload";
import { useAppDispatch } from "@/redux/hook";
import { setUserData } from "@/redux/slice/user";

interface IProps {
    open: boolean,
    onClose: () => void
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }

    console.log(isJpgOrPng && isLt2M)
    return isJpgOrPng && isLt2M;
};

const UserInfoDrawerComponent: React.FC<IProps> = (props: IProps) => {

    const [form] = Form.useForm();

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(() => {
        if (props.open) {
            currentUser().then((res: AxiosResponse<Response<SysUser>>) => {
                const {data} = res.data;

                setImageUrl(data.avatar);
                form.setFieldsValue(data);
            })
        }

    }, [props.open]) // eslint-disable-line

    const onFinish = (values: SysUser) => {
        console.log({...values, ...{avatar: imageUrl}});

        let data: UserInfoEditRequest = {
            nickname: values.nickname,
            email: values.email ?? null,
            avatar: imageUrl ?? null
        };
        currentUserSave(data).then((res: AxiosResponse<Response<SysUser>>) => {
            const {data} = res.data;
            dispatch(setUserData({avatar: data.avatar, nickname: data.nickname}));

            message.success("更新成功");
        })

    }

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        console.log(info.fileList);

        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    //如果是typescript, 那么参数写成 e: any
    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const customRequest = (options: RcCustomRequestOptions) => {
        console.log('options= ', options)
        const formDate = new FormData();
        formDate.append("file", options.file);

        // 然后让axios等待回传，回传成功再执行onsuccess
        uploadImage(formDate).then(res => {
            setImageUrl(res.data.data);
        })

    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    return (
        <>
            <Drawer
                title="管理员信息"
                width={720}
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
                    name={'user-info-edit-drawer-from'}
                    form={form}
                    autoComplete="off"
                    onFinish={(values: SysUser) => onFinish(values)}

                >
                    <Row gutter={16} style={{textAlign: 'center'}}>
                        <Col span={24}>
                            <Form.Item
                                name="avatar-upload"
                                valuePropName={'fileList'}
                                getValueFromEvent={normFile}
                                extra={'管理员头像'}
                            >
                                <Upload
                                    name="avatar-upload"
                                    listType="picture-circle"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    customRequest={(options: RcCustomRequestOptions) => customRequest(options)}
                                >
                                    {
                                        imageUrl ?
                                            <img
                                                src={imageUrl}
                                                alt="avatar"
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    borderRadius: '50px',
                                                    objectFit: 'cover', // 处理图片显示拉伸问题
                                                }}
                                            /> : uploadButton
                                    }
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="username"
                                label="用户名"
                                rules={[{required: true, message: '请输入用户名'}]}
                            >
                                <Input placeholder="请输入用户名" disabled={true}/>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="nickname"
                                label="昵称"
                                rules={[{required: true, message: '请输入昵称'}]}
                            >
                                <Input allowClear placeholder="请输入用户名"/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="邮箱"
                                rules={[
                                    {type: 'email', message: "格式不正确"}
                                ]}
                            >
                                <Input allowClear placeholder="请输入邮箱"/>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Drawer>
        </>
    );
}

UserInfoDrawerComponent.defaultProps = {
    open: false,
    onClose: () => {
    },
}


export default UserInfoDrawerComponent;