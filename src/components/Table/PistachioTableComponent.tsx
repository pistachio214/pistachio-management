import React, {useEffect, useState} from "react";
import {Button, Table} from "antd";
import {ReloadOutlined, PlusOutlined} from "@ant-design/icons";

import {PisTableContainer} from "@/components/Table/style";
import AuthWrapper from "@/components/AuthHoc/AuthWrapper";
import {ITableProps, IPagination} from "@/types/table";
import request from "@/axios/request";
import {AxiosResponse} from "axios";
import {Response} from "@/types/common";

const PistachioTableComponent: React.FC<ITableProps> = (props: ITableProps) => {

    const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);
    const [pagination, setPagination] = useState<IPagination>();

    useEffect(() => {
        initList();
    }, [props.url, props.params, props.isVisible]); // eslint-disable-line react-hooks/exhaustive-deps


    const initList = async () => {
        setLoadingStatus(true);
        const {url, method, params} = props;
        await request({
            url: url,
            method: method,
            params: params
        }).then((res) => {
            console.log(res.data.data);

            const {content, size, number, totalElements} = res.data.data;

            setData(content);
            let pagination: IPagination = {
                pageSize: size,
                defaultCurrent: 1,
                current: number + 1,
                total: totalElements,
                onChange: (page: number) => {
                    props.quickJump(page);
                }
            }
            setPagination(pagination);
            setLoadingStatus(false);
        });
    }

    return (
        <PisTableContainer>
            <div className="action-container">
                <div className="search-container">
                    {props.search}
                </div>
                {
                    props.operator ?
                        <div className="common-btn-container">
                            {
                                props.reload?.hide ? null : (
                                    <AuthWrapper hasPermiss={props.reload?.hasPremiss!}>
                                        <Button
                                            type="primary"
                                            icon={<ReloadOutlined/>}
                                            onClick={
                                                () => {
                                                    props.reload?.click !== undefined ? props.reload?.click() : initList()
                                                }}
                                            disabled={props.reload?.hide}
                                        >
                                            刷新
                                        </Button>
                                    </AuthWrapper>
                                )
                            }

                            {
                                props.plus?.hide ? null : (
                                    <AuthWrapper hasPermiss={props.plus?.hasPremiss!}>
                                        <Button
                                            icon={<PlusOutlined/>}
                                            onClick={() => props.plus?.click!()}
                                            disabled={props.plus?.hide}
                                        >
                                            新增
                                        </Button>
                                    </AuthWrapper>
                                )
                            }

                        </div>
                        :
                        null
                }
            </div>

            <Table
                rowKey={props.rowKey}
                columns={props.columns}
                dataSource={data}
                loading={loadingStatus}
                bordered={true}
                size={'small'}
                pagination={{
                    ...pagination
                }}
                scroll={{
                    scrollToFirstRowOnChange: true
                }}
                style={{
                    paddingRight: '5px'
                }}
            />
        </PisTableContainer>
    );
};

PistachioTableComponent.defaultProps = {
    columns: [],
    operator: true,
    search: <></>,
    reload: {
        hide: false,
        click: undefined,
        hasPremiss: []
    },
    method: 'GET',
    params: {},
    plus: {
        hide: false,
        click: () => {
            console.log('点击新增按钮')
        },
        hasPremiss: []
    },
    isVisible: false
}

export default PistachioTableComponent;