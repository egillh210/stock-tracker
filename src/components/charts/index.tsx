import React, { useEffect, useState } from 'react';
import loading from '../../gif/loading.gif'
import styled from '@emotion/styled'

import { 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    ReferenceLine,
} from 'recharts';
import { _ChartSingleDataPoint, Range } from '../../models';

const ChartContainer = styled.div`    
    flex: 0 1 75%;
    max-width: 1200px;
    @media(max-width: 800px) {
        margin-bottom: 40px;
    }
`

const ChartLoadingContainer = styled.div`
    flex: 0 1 75%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-right: 60px;
    height: 10%;
    @media(max-width: 800px) {
        justify-content: space-evenly;
        margin-bottom: 20px;
    }
`

const Label = styled.div`
    margin: 0rem 0rem 1rem 0.5rem;
    display: inline-block;
    color: inherit;
    text-decoration: none;
    font-weight: 100;
    text-transform: uppercase;
    cursor: pointer;
`

const Input = styled.input`
    display: none;
`

const ChartLoading = styled.img`
    background-color: rgba(89, 89, 105, 0.2);
    padding: 10% 40% 10% 40%;
    border-radius: 5%;
`

type RangeButtonProps = {
    range: Range;
    update: (range: Range) => void;
    current: boolean;
}

type ChartProps = {
    prices: _ChartSingleDataPoint[],
    range: Range,
    updateChartRange: (range: Range) => void,
    updateChartPrices: (chartRange: _ChartSingleDataPoint[]) => void,
    open: boolean | null,
    ticker: string,
    latest?: number,
    errorQuote: boolean,
}

const RangeButton: React.FC<RangeButtonProps> = ({ range, update, current }) => {
    const opacity = current ? 1.0 : 0.5;
    return (
        <Label>
            <Input 
                type="radio" 
                name="chart" 
                defaultChecked={current}
            />
            <span onClick={() => update(range)} style={{opacity}}>{range}</span>
        </Label>
    )
}


type ChartState = { [key in Range]: {
    data: _ChartSingleDataPoint[] | [],
    expirationTime: Date | null,
} | null }

const initialState: ChartState = {
    '1d': {
        data: [],
        expirationTime: null,
    },
    '5d': {
        data: [],
        expirationTime: null,
    },
    '1m': {
        data: [],
        expirationTime: null,
    },
    '1y': {
        data: [],
        expirationTime: null,
    },
    '5y': {
        data: [],
        expirationTime: null,
    },
}


const Chart: React.FC<ChartProps> = ({ errorQuote, prices, ticker, open, latest, range, updateChartRange, updateChartPrices }) => {

    const [chart, setChart] = useState<ChartState>(initialState);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [flag, setFlag] = useState<boolean>(true);

    const boolFlag = open && (range === '1d');

    const getExpirationDate = () => {
        let date = new Date();
        const shouldAddDay = date.getUTCHours() >= 14 && date.getUTCMinutes() >= 30;
        date.setUTCDate(date.getUTCDate() + Number(shouldAddDay));
        date.setUTCHours(14, 30, 0, 0)
        return date;
    }

    const fetchChart = async () => {
        setIsFetching(true);
        try {
            const chart = await fetch(`/stock/${ticker}/chart/${range}`).then(res => res.json());
            
            setChart(state => {
                return ({
                    ...state,
                    [range]: { data: chart, expirationTime: getExpirationDate() }
                })
            })
            if(flag) updateChartPrices(chart);
        } catch (error) {
            setIsError(true);
        }
        setIsFetching(false);
    }


    useEffect(() => {
        setFlag(true);
        const chartData = chart[range];
        if (chartData && chartData.data[0] && chartData.data[0].symbol === ticker && chartData.expirationTime && chartData.expirationTime.getTime() > Date.now()) {
            updateChartPrices(chartData.data);
        } else {
            fetchChart();
        }
        return () => {
            setFlag(false);
        }
    }, [range, ticker, open])

    useEffect(() => {
        if(boolFlag) {
            fetchChart();
            const polling = window.setInterval(
                () => {
                    fetchChart();
                },
                10000
            )
            return () => clearInterval(polling)
        }
    }, [ticker, boolFlag])

    const ranges: Range[] = ['5y', '1y', '1m', '5d', '1d'];
    const buttons = ranges.map(rangeItem => <RangeButton current={rangeItem === range} range={rangeItem} update={updateChartRange} />)

    const now: _ChartSingleDataPoint = {
        label: 'latest',
        close: latest,
    }

    const testing = false;

    const data = open || testing ? prices.concat(now) : prices;

    //TODO: Add loading spinner. Add error message if error (conditional rendering based on isFetching & isError)
    return (
          <>    
            {!isFetching ? 
                <ChartContainer>
                    <ButtonsContainer>
                        {buttons}
                    </ButtonsContainer>
                    <ResponsiveContainer aspect={0.9} width='99%' height='100%' maxHeight={500}>
                        <AreaChart data={data} >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="label"/>
                            <YAxis orientation="right" domain={['dataMin', 'auto']} tickLine={false}/>
                            <ReferenceLine y={now.close} stroke={'orange'} strokeDasharray="3 3" />
                            <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
                            <Area connectNulls type="monotone" dataKey="close" name="price" unit=" USD" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>
                :
                <ChartLoadingContainer>
                    <ChartLoading src={loading} />
                </ChartLoadingContainer>
            }
          </>

    );
}


export default Chart;