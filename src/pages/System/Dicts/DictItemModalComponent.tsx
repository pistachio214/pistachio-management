import React, {useState} from "react";
import {Modal} from "antd";
import {ColumnsType} from "antd/lib/table";
import { DeleteOutlined } from "@ant-design/icons";

import {PageQuestionType} from "@/types/common";
import {SysDictItem} from "@/types/dict";
import {IOperator} from "@/types/operator";
import {dictItemDelete, dictItemList} from "@/api/dict";
import ActionOperatorComponent from "@/components/ActionOperator/ActionOperatorComponent";
import PistachioTableComponent from "@/components/Table/PistachioTableComponent";
import DictItemSaveModalComponent from "@/pages/System/Dicts/DictItemSaveModalComponent";

interface IProps {
    name?: string
    isVisible: boolean
    id: number
    type: string
    closeModal: () => void
}

const DictItemModalComponent: React.FC<IProps> = (props: IProps) => {

    const [params, setParams] = useState<PageQuestionType>();
    const [id, setId] = useState<number>(0);
    const [isRefresh, setIsRefresh] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [isSaveDictItemVisible, setIsSaveDictItemVisible] = useState<boolean>(false);

    const columns: ColumnsType<SysDictItem> = [
        {
            title: '序号',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: '数据值',
            dataIndex: 'value',
            align: 'center'
        },
        {
            title: '标签名',
            dataIndex: 'label',
            align: 'center'
        },
        {
            title: '描述',
            dataIndex: 'description',
            align: 'center'
        },
        {
            title: '排序',
            dataIndex: 'sort',
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
            render: (text, record: SysDictItem) => {
                const item: IOperator[] = [
                    {
                        title: '编辑',
                        permission: ['sys:dict:item:save'],
                        onClick: () => {
                            showEditDictItemModal(record.id!);
                        }
                    },
                    {
                        title: '删除',
                        danger: true,
                        icon: <DeleteOutlined />,
                        permission: ['sys:dict:item:delete'],
                        message: `是否删除该字典项 [ ${record.label} ] ?`,
                        onClick: () => {
                            handleDelete(record.id!);
                        }
                    }
                ];

                return (
                    <ActionOperatorComponent items={item} />
                )
            },
        },
    ]

    const showEditDictItemModal = (id: number) => {
        setId(id);
        setIsEdit(true);
        setIsSaveDictItemVisible(true);
    }

    const handleDelete = (id: number) => {
        dictItemDelete(id).then(() => {
            setIsRefresh(!isRefresh);
        })
    }

    const showCreateDictItemModal = () => {
        setIsEdit(false);
        setIsSaveDictItemVisible(true);
    }

    const closeDictItemModal = () => {
        setIsRefresh(!isRefresh);
        setIsSaveDictItemVisible(false);
    }

    const handleCancel = () => {
        props.closeModal();
    }

    return (
        <>
            <Modal title={`${props.name} 字典项`}
                   open={props.isVisible}
                   onCancel={() => handleCancel()}
                   getContainer={false}
                   width={'80%'}
                   footer={false}
            >
                <PistachioTableComponent
                    url={dictItemList(props.id)}
                    rowKey={(record: SysDictItem) => record.id!}
                    columns={columns}
                    isVisible={isRefresh}
                    params={params}
                    reload={{
                        hide: true,
                        hasPremiss: ['sys:dict:item:list'],
                        click: () => showCreateDictItemModal()
                    }}
                    quickJump={(page: number) => {
                        setParams({ ...params, ...{ current: page } })
                    }}
                />

                <DictItemSaveModalComponent
                    id={id}
                    type={props.type}
                    isEdit={isEdit}
                    dictId={props.id}
                    isVisible={isSaveDictItemVisible}
                    closeModal={() => closeDictItemModal()}
                />

            </Modal>
        </>
    );
};

DictItemModalComponent.defaultProps = {
    name: "字典名称",
    id: 0,
    isVisible: false,
    closeModal: () => {
        console.log('close Modal')
    }
}

export default DictItemModalComponent;