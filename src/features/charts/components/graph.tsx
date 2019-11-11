import React, { memo } from 'react'
import { Range } from '../models/range'
import { ChartSingleDataPoint } from '../models/charts'
import { 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    ReferenceLine,
    Label,
} from 'recharts';

type GraphProps = {
    prices: ChartSingleDataPoint[],
    range: Range,
    latest: number,
}

export const Graph = memo<GraphProps>(({range, latest, prices}) => {

    const interval = range === '5d' ? 39 : range === '1m' ? 12 : range === '1d' ? 59 : range === '1y' ? 23 : 253;

    return (
        <ResponsiveContainer aspect={0.1} width='99%' maxHeight={425}>
            <AreaChart data={prices} margin={{ left: 35 }} >
                <defs>
                    <linearGradient id='area' x1="0" y1="0" x2="0" y2="1">
                        <stop offset="30%" stopColor="#2d5083" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#2d5083" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid stroke='#1d4168' strokeWidth={0.8} />
                <XAxis tick={{fill: 'white'}} axisLine={false} interval={interval} dataKey="label" type="category" allowDataOverflow={false} />
                <YAxis tick={{fill: 'white'}} axisLine={false} orientation="right" domain={['dataMin', 'auto']} tickLine={false} tickFormatter={item => item.toFixed(2)} />
                <ReferenceLine y={latest} stroke={'#e95656'} strokeDasharray="3 3" label={
                    <Label value={latest && latest.toFixed(2)} position="right" fill="#e95656" /> } 
                />
                <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
                <Area connectNulls type="monotone" dataKey="close" name="price" unit=" USD" fill='url(#area)' fillOpacity={1} stroke="#608fd1" />
            </AreaChart>
        </ResponsiveContainer>
    )
})
