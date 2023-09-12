import React from "react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesVolumeTabComponent: React.FC = () => {

    const data = [
        {
            name: '1月',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: '2月',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: '3月',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: '4月',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: '5月',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: '6月',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: '7月',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: '8月',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: '9月',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: '10月',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: '11月',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: '12月',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
    ];

    return (
        <div style={{height: '415px',width: '100%',}}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 30,
                            right: 20,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar name={"国内销售额"} dataKey="pv" fill="#8884d8" />
                        <Bar name={'海外销售额'} dataKey="uv" fill="#82ca9d" />
                    </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SalesVolumeTabComponent;