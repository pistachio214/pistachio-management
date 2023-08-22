import React, {useEffect, useState} from "react";
import {Button, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: (text) => <span>{text}</span>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        align: 'center',
    },
    {
        title: 'Tags',
        key: 'tags',
        align: 'center',
        dataIndex: 'tags',
        render: (_, {tags}) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record: DataType) => (
            <Space size="middle">
                <Button type="link">Invite {record.name}</Button>
                <Button type="link" danger>Delete</Button>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const Dict: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [])

    return (
        <Table
            loading={loading}
            bordered={true}
            columns={columns}
            dataSource={data}
            title={(currentPageDate) => {
                return <>数据字典</>
            }}
        />
    );
}

export default Dict;