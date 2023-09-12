import React from "react";
import { Col, Row, Tooltip as AntdTooltip, Progress } from 'antd';
import {
    BarChart,
    Bar,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from 'recharts';
import IntroduceRowColItemComponent from "@/pages/dashboard/IntroduceRowColItemComponent";
import { InfoCircleOutlined, CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import {
    EffectOfOperatingActivitiesContainer, EffectOfOperatingActivitiesFooterContainer,
    NumberOfPaymentsContainer,
    NumberOfVisitsContainer,
    SalesVolumeContainer
} from "@/pages/dashboard/style";

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: {marginBottom: 24,},
};

const IntroduceRowComponent: React.FC = () => {
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    const dataThree = [
        {
            pv: 2400,
        },
        {
            pv: 1398,
        },
        {
            pv: 5800,
        },
        {
            pv: 3908,
        },
        {
            pv: 4800,
        },
        {
            pv: 3800,
        },
        {
            pv: 4300,
        },
        {
            pv: 3200,
        },
        {
            pv: 1200,
        },
        {
            pv: 2400,
        },
        {
            pv: 2600,
        },
        {
            pv: 2000,
        },
        {
            pv: 3426,
        },
        {
            pv: 4382,
        },
        {
            pv: 4300,
        },
        {
            pv: 2000,
        },
        {
            pv: 1100,
        },
    ];

    return (
        <>
            <Row gutter={24}>
                <Col {...topColResponsiveProps}>
                    <IntroduceRowColItemComponent
                        title={"总销售额"}
                        action={
                            <AntdTooltip title={"指标说明"}>
                                <InfoCircleOutlined/>
                            </AntdTooltip>
                        }
                        content={
                            <SalesVolumeContainer>
                                <div className={'one'}>126,560</div>
                                <div className={'two'}>
                                    <div>周同比12% <CaretUpOutlined style={{color: "#F5222d"}}/></div>
                                    <div>日同比11% <CaretDownOutlined style={{color: "#52C41A"}}/></div>
                                </div>
                            </SalesVolumeContainer>
                        }
                        footer={"日销售额￥12,423"}
                    />
                </Col>

                <Col {...topColResponsiveProps}>
                    <IntroduceRowColItemComponent
                        title={"访问量"}
                        action={
                            <AntdTooltip title={"指标说明"}>
                                <InfoCircleOutlined/>
                            </AntdTooltip>
                        }
                        content={
                            <NumberOfVisitsContainer>
                                <div className={'number-of-visits'}>8,846</div>
                                <div className={'content'}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={data}
                                            margin={{
                                                top: 0,
                                                right: 0,
                                                left: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <Tooltip/>
                                            <Area name={"访问量"} type="monotone" dataKey="uv" stroke="#975FE4" fill="#975FE4"/>
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </NumberOfVisitsContainer>
                        }
                        footer={"日访问量 1,234"}
                    />
                </Col>

                <Col {...topColResponsiveProps}>
                    <IntroduceRowColItemComponent
                        title={"支付笔数"}
                        action={
                            <AntdTooltip title={"指标说明"}>
                                <InfoCircleOutlined/>
                            </AntdTooltip>
                        }
                        content={
                            <NumberOfPaymentsContainer>
                                <div className={'number-of-visits'}>6,560</div>
                                <div className={'content'}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={dataThree}
                                            margin={{
                                                top: 0,
                                                right: 0,
                                                left: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <Tooltip/>
                                            <Bar name={'数量'} dataKey="pv" fill="#8884d8"/>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </NumberOfPaymentsContainer>
                        }
                        footer={"转化率  60%"}
                    />
                </Col>

                <Col {...topColResponsiveProps}>
                    <IntroduceRowColItemComponent
                        title={"运营活动效果"}
                        action={
                            <AntdTooltip title={"指标说明"}>
                                <InfoCircleOutlined/>
                            </AntdTooltip>
                        }
                        content={
                            <EffectOfOperatingActivitiesContainer>
                                <div className={'number-of-visits'}>78%</div>
                                <div className={'content'}>
                                    <Progress
                                        percent={78.9}
                                        strokeColor={{'0%': '#108ee9', '100%': '#87d068'}}
                                        showInfo={false}
                                        strokeLinecap={'butt'}
                                    />
                                </div>
                            </EffectOfOperatingActivitiesContainer>
                        }
                        footer={
                            <EffectOfOperatingActivitiesFooterContainer>
                                <div>周同比12% <CaretUpOutlined style={{color: "#F5222d"}}/></div>
                                <div>日同比11% <CaretDownOutlined style={{color: "#52C41A"}}/></div>
                            </EffectOfOperatingActivitiesFooterContainer>
                        }
                    />
                </Col>
            </Row>
        </>
    );
}


export default IntroduceRowComponent;