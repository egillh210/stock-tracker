import React, { memo } from 'react'
import styled from '@emotion/styled'
import { PriceSingleDataPoint } from 'models';
const { div, span } = styled;


type ColorProps = {
    color: string
}

const TickerPriceContainer = div`
    margin-right: 25px;
    display: flex;
    flex: 0 0 1;
    font-size: 14px;
`

const Ticker = div`
    margin-right: 10px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: left;
`

const PriceLayoutContainer = div`
    font-size: inherit;
    display: flex;
    font-weight: normal;
    @media(max-width: 1000px) {
        max-height: 60px;
        justify-content: center;
    };
    @media(max-width: 800px) {
        max-height: 60px;
        justify-content: center;
    };
    @media(max-width: 588px) {
        font-size: 30px;
    };
`

const PriceChange = span`
    display: flex;
    margin-right: 10px;
`

const PriceIcon = span`
    font-size: 0.5em;
    align-self: flex-start;
    margin-top: 1px;
`

const PriceContainer = span`
    display: flex;
    flex: 0 0 1;
    margin-right: 10px;
`

const DollarIcon = div`
    font-size: 8px;
    font-weight: 400;
    margin-top: 1px;
`

const ChangeLayoutContainer = div<ColorProps>`
    color: ${(props: ColorProps) => props.color};
    display: flex;
`


export const TickerPrice = memo<PriceSingleDataPoint>(({
    ticker,
    latestPrice, 
    change, 
    changePercent, 
    error 
    }) => {

    const isPositive = change >= 0;

    return (
        <TickerPriceContainer>
            <Ticker>{ticker}</Ticker>
            <PriceLayoutContainer>
                <PriceContainer>
                    <DollarIcon>$</DollarIcon>
                    {latestPrice.toFixed(2)}
                </PriceContainer> 
                <ChangeLayoutContainer color={isPositive ? '#91e4a5' : '#e95656'} >
                    <PriceChange>
                        {isPositive ?<PriceIcon>&#129121;</PriceIcon> : <PriceIcon>&#129123;</PriceIcon>}
                        {Math.abs(change).toFixed(2)}
                    </PriceChange>
                    <PriceChange>
                        {(Math.abs(changePercent) * 100).toFixed(2)}
                        <PriceIcon>%</PriceIcon>
                    </PriceChange>
                </ChangeLayoutContainer>
            </PriceLayoutContainer>
        </TickerPriceContainer>
    )
})
