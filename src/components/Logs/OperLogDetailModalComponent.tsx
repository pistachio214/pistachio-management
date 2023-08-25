import React, {useEffect, useState} from "react";
import {Modal, Descriptions} from "antd";
import {AxiosResponse} from "axios";
import ReactJson from "react-json-view";

import {SysOperLog, SysOperLogoDetailsProps} from "@/types/log";
import {findOperLog} from "@/api/log";

const OperLogDetailModalComponent: React.FC<SysOperLogoDetailsProps> = (props: SysOperLogoDetailsProps) => {

    const [sysOperLog, setSysOperLog] = useState<SysOperLog>();

    useEffect(() => {
        const {id, isVisible} = props;

        if (isVisible) {
            findOperLog(id).then((res: AxiosResponse<SysOperLog>) => {
                setSysOperLog(res.data);
            })
        }
    }, [props.isVisible])// eslint-disable-line react-hooks/exhaustive-deps

    const handleCancel = () => {
        props.closeModel()
    }

    return (
        <>
            <Modal
                title={`日志详情`}
                open={props.isVisible}
                onCancel={() => handleCancel()}
                getContainer={false}
                width={'80%'}
                footer={false}
            >
                <Descriptions
                    bordered
                    size='small'
                    column={3}
                >
                    <Descriptions.Item label="操作模块">{sysOperLog?.operModul}</Descriptions.Item>
                    <Descriptions.Item label="操作类型">{sysOperLog?.operType}</Descriptions.Item>
                    <Descriptions.Item label="版本号">{sysOperLog?.operVer}</Descriptions.Item>
                    <Descriptions.Item label="操作描述" span={3}>
                        {sysOperLog?.operDesc}
                    </Descriptions.Item>
                    <Descriptions.Item label="操作者">{sysOperLog?.operUserName}</Descriptions.Item>
                    <Descriptions.Item label="IP">{sysOperLog?.operIp}</Descriptions.Item>
                    <Descriptions.Item label="操作时间">{sysOperLog?.createdAt}</Descriptions.Item>

                    <Descriptions.Item label="操作方法" span={3}>
                        {sysOperLog?.operMethod}
                    </Descriptions.Item>
                    <Descriptions.Item label="请求地址" span={3}>
                        {sysOperLog?.operUri}
                    </Descriptions.Item>
                    <Descriptions.Item label="请求方式" span={3}>
                        {sysOperLog?.operRequMethod}
                    </Descriptions.Item>
                    <Descriptions.Item label="请求参数" span={3}>
                        {
                            sysOperLog?.operRequParam !== undefined ? (
                                <ReactJson
                                    src={JSON.parse(sysOperLog?.operRequParam)}
                                    name={false}
                                    displayDataTypes={false}
                                    enableClipboard={false}
                                />
                            ) : null
                        }

                    </Descriptions.Item>
                    <Descriptions.Item label="返回结果" span={3}>
                        {
                            sysOperLog?.operRequParam !== undefined ? (
                                <ReactJson
                                    src={JSON.parse(sysOperLog?.operRespParam)}
                                    name={false}
                                    displayDataTypes={false}
                                    enableClipboard={false}
                                />
                            ) : null
                        }
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    );
};

export default OperLogDetailModalComponent;