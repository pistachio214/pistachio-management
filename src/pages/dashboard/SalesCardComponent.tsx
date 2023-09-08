import React from "react";

import { Tabs, DatePicker, Col, Row } from 'antd';
import type { TabsProps } from 'antd';
import numeral from 'numeral';

import { SalesCardContainer } from "@/pages/dashboard/style";
import SalesVolumeTabComponent from "@/pages/dashboard/componts/SalesVolumeTabComponent";

const {RangePicker} = DatePicker;

const SalesCardComponent: React.FC = () => {

    const data = Array.from({length: 10}, (_, i) => i + 1);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '销售额',
            children: '特别神奇的问题',
        },
        {
            key: '2',
            label: '访问量',
            children: <SalesVolumeTabComponent/>,
        },
    ];

    const twoItems: TabsProps['items'] = [
        {
            key: '1',
            label: '今日',
        },
        {
            key: '2',
            label: '本周',
        },
        {
            key: '3',
            label: '本月',
        },
        {
            key: '4',
            label: '本年',
        },
    ];

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <SalesCardContainer>
            <Row gutter={24} style={{width: '100%'}}>
                <Col xl={14} lg={14} md={14} sm={14} xs={14} style={{border: '1px solid red'}}>
                    <Tabs
                        key={"Sales-Volume-Tabs"}
                        style={{width: '100%', height: '100%'}}
                        defaultActiveKey="1"
                        items={items}
                        onChange={onChange}
                        className={'tabs-container'}
                    />
                </Col>

                <Col xl={10} lg={10} md={10} sm={10} xs={10} style={{border: '1px solid blue'}}>
                    <div className={'two-tabs-container'}>
                        <Tabs
                            key={"Two-Sales-Volume-Tabs"}
                            defaultActiveKey={"1"}
                            items={twoItems}
                            onChange={onChange}
                            centered={true}
                            tabBarExtraContent={<RangePicker/>}
                        />

                        <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{height: '100%'}}>
                            <h4 className={'title'}>门店销售额排名</h4>

                            <div>
                                {
                                    data.map((item: number, index: number) => {
                                        return (
                                            <div key={`ranking-item-key-${index}`} className={'ranking-item'}>
                                                <span>{item}、 重庆市渝中区中环路 {index + 1} 号店</span>
                                                <span>{numeral((323234 + item) / (index + 1)).format('0,0')}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </div>
                </Col>
            </Row>


        </SalesCardContainer>
    );
}

export default SalesCardComponent;