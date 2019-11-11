import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Loader } from '../loader/Loader';
import { Graph, RangeButtons } from'./components'
import { ChartSingleDataPoint, Range } from './models';
import { updateChartRange } from './redux';
import { AppState } from '../../models/appState';

const ChartLayoutContainer = styled.div`    
    flex: 0 1 66%;
    margin-top: 15px;
    margin-left: -35px;
    font-size: 10px;
    font-weight: 300;
    max-width: 890px;
    @media(max-width: 750px) {
        margin-top: 40px;
        margin-right: -30px;
        margin-bottom: -10px;
    }
`

type UpdateChartRange = (range: Range) => void;

export const Chart = memo(() => {

    const prices: ChartSingleDataPoint[] = useSelector((store: AppState) => store.charts.prices);
    const range: Range = useSelector((store: AppState) => store.charts.range);
    const latest: number = useSelector((store: AppState) => {
        const { search, prices } = store;
        const { latestPrice } = prices.find(({ ticker }) => ticker === search) || prices[0];
        return latestPrice;
    });
    const dispatch = useDispatch();
    const updateRange: UpdateChartRange = useCallback((range: Range) => dispatch(updateChartRange(range)), [range, dispatch])

    return (
            <ChartLayoutContainer>
                {
                    prices.length !== 0 
                    ? <><RangeButtons range={range} update={updateRange}/><Graph prices={prices} range={range} latest={latest}/></>
                    : <Loader className='margin-top: 250px; @media(max-width: 750px) { margin-top: 10px; margin-bottom: 50px; }' size={50} seperation={2} speed={1.4} />
                }                         
            </ChartLayoutContainer>
    );
})
