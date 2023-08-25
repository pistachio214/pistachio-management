import React, {useEffect, useState} from "react";
import {Form, Select} from "antd";
import {OptionsInterface, Response} from "@/types/common";
import {getDictByKey} from "@/api/dict";
import {AxiosResponse} from "axios";
import {SysDictListResponse} from "@/types/dict";
import UuidUtil from "@/utils/UuidUtil";

interface IProps {
    type: string
    name?: string
    defaultValue?: string | number
    style?: React.CSSProperties
    disabled?: boolean
}


const PistachioDictFormComponent: React.FC<IProps> = (props: IProps) => {

    const [options, setOptions] = useState<OptionsInterface[]>([]);
    const [label, setLabel] = useState<string>('');

    useEffect(() => {
        getDictByKey(props.type).then((res: AxiosResponse<Response<SysDictListResponse>>) => {
            const {data} = res.data;
            if (data != null) {
                setLabel(data.name)
                let option: OptionsInterface[] = [];
                option.push.apply(option, data.items)
                setOptions(option)
            }
        })
    }, [props.type]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Form.Item name={props.name} label={label} initialValue={props.defaultValue} key={UuidUtil.getUuiD(8)}>
                <Select
                    placeholder={`请选择`}
                    style={props.style}
                    disabled={props.disabled}
                    options={options}
                    allowClear
                />
            </Form.Item>
        </>
    );
};

PistachioDictFormComponent.defaultProps = {
    type: '',
    name: 'name',
    defaultValue: undefined,
    style: {width: 120}
}

export default PistachioDictFormComponent;