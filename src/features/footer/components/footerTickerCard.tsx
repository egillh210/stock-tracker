import React, { memo } from 'react';
import styled from '@emotion/styled'
import { PriceSingleDataPoint } from '../../../models/prices'
import { TickerPrice } from './tickerPrice'

const Ticker = styled.div`
    margin-right: 10px;
    text-transform: uppercase;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
`

const PriceCard = styled.div`
    margin-right: 25px;
    display: flex;
    flex: 0 0 1;
    font-size: 14px;
`

export const FooterTickerCard = memo<PriceSingleDataPoint>(({ ticker, latestPrice, change, changePercent, error }) => {

    return (
        <PriceCard>
            <Ticker>{ticker}</Ticker>
            <TickerPrice error={error} latestPrice={latestPrice} change={change} changePercent={changePercent} />
        </PriceCard>
    )
})
