import React, {useEffect, useState} from "react";
import {Form, Input, Button} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/lib/table";
import {AxiosResponse} from "axios";

import {DictQuestionType, SysDict, SysDictListResponse} from "@/types/dict";
import DictUtil from "@/utils/DictUtil";
import {OptionsInterface} from "@/types/common";
import {IOperator} from "@/types/operator";
import ActionOperatorComponent from "@/components/ActionOperator/ActionOperatorComponent";
import PistachioDictFormComponent from "@/components/Dict/PistachioDictFormComponent";
import PistachioTableComponent from "@/components/Table/PistachioTableComponent";
import {delDict, getDictByKey, getDictList} from "@/api/dict";
import DictSaveModalComponent from "@/pages/System/Dicts/DictSaveModalComponent";
import DictItemModalComponent from "@/pages/System/Dicts/DictItemModalComponent";

const Dict: React.FC = () => {

    const [form] = Form.useForm();

    const [params, setParams] = useState<DictQuestionType>();

    const [isSaveVisible, setIsSaveVisible] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    const [edit, setEdit] = useState<boolean>(false);

    const [isDictItemVisible, setIsDictItemVisible] = useState<boolean>(false);
    const [dictName, setDictName] = useState<string>();
    const [type, setType] = useState<string>('');

    const [isRefresh, setIsRefresh] = useState<boolean>(false);
    const [dictType, setDictType] = useState<OptionsInterface[]>([]);

    useEffect(() => {
        getDictByKey('dicts_type').then((res: AxiosResponse<SysDictListResponse>) => {
            if (res.data != null) {
                setDictType(res.data.items)
            }
        });
    }, [])

    const columns: ColumnsType<SysDict> = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: '类型标识',
            dataIndex: 'type',
            align: 'center'
        },
        {
            title: '描述',
            dataIndex: 'description',
            align: 'center'
        },
        {
            title: '字典类型',
            dataIndex: 'system',
            align: 'center',
            render: (value: string, record: SysDict) => {
                return DictUtil.generateDictItem(dictType, value);
            }
        },
        {
            title: '备注信息',
            dataIndex: 'remarks',
            align: 'center'
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record: SysDict) => {
                const item: IOperator[] = [
                    {
                        title: '字典项',
                        permission: ['sys:dict:item:list'],
                        onClick: () => {
                            showDictItemModal(record.id!, `${record.description} ( ${record.type} ) `, record.type)
                        }
                    },
                    {
                        title: '编辑',
                        permission: ['sys:dict:edit'],
                        onClick: () => {
                            showEditDictModal(record.id!);
                        }
                    }
                ];

                if (record.id !== 1) {
                    item.push({
                        title: '删除',
                        danger: true,
                        icon: <DeleteOutlined/>,
                        permission: ['sys:dict:delete'],
                        message: `是否删除该字典 [ ${record.description} ] ?`,
                        onClick: () => {
                            handleDelete(record.id!);
                        }
                    })
                }

                return (
                    <ActionOperatorComponent items={item}/>
                )
            },
        },
    ];

    const handleDelete = (id: number) => {
        delDict(id).then(() => {
            setIsRefresh(!isRefresh);
        })
    }

    const showDictItemModal = (id: number, name: string, type: string) => {
        setId(id);
        setType(type);
        setDictName(name);
        setIsDictItemVisible(true);
    }

    const showEditDictModal = (id: number) => {
        setId(id);
        setEdit(true);
        setIsSaveVisible(true);
    }

    const showSaveDictModal = () => {
        setIsSaveVisible(true);
        setEdit(false);
    }

    const closeSaveDictModal = () => {
        setIsSaveVisible(false);
        setIsRefresh(!isRefresh);
    }

    const closeDictItemModal = () => {
        setIsDictItemVisible(false);
    }

    const handleSearch = (values: { type: string, system: number }) => {
        setParams({
            ...params, ...{
                type: values.type,
                system: values.system?.toString()
            }
        })
    }

    const searchRender = (
        <Form form={form} layout="inline" name="search-dict" onFinish={(values) => handleSearch(values)}>
            <Form.Item name={'type'} label={'类型名称'}>
                <Input placeholder="类型名称" allowClear/>
            </Form.Item>

            <PistachioDictFormComponent type={"dicts_type"} name={"system"} style={{width: 180}}/>

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
                rowKey={(record: SysDict) => record.id!}
                columns={columns}
                search={searchRender}
                url={getDictList()}
                isVisible={isRefresh}
                params={params}
                reload={{
                    hasPremiss: ['sys:dict:list']
                }}
                plus={{
                    click: () => showSaveDictModal(),
                    hasPremiss: ['sys:dict:save']
                }}
                quickJump={(page: number) => {
                    setParams({...params, ...{current: page}})
                }}
            />

            <DictSaveModalComponent
                isVisible={isSaveVisible}
                isEdit={edit}
                id={id}
                closeModal={() => closeSaveDictModal()}
            />

            <DictItemModalComponent
                id={id}
                type={type}
                name={dictName}
                isVisible={isDictItemVisible}
                closeModal={() => closeDictItemModal()}
            />
        </>
    );
}

export default Dict;