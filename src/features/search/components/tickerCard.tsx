import React, { memo } from 'react';
import styled from '@emotion/styled'
import { PriceSingleDataPoint } from '../../../models/prices';

const PriceStats = styled.div`
    font-size: inherit;
    display: flex;
    flex: 0 0 300px;
    font-weight: 300;
    @media(max-width: 1000px) {
        max-height: 60px;
        justify-content: center;
    };
    @media(max-width: 650px) {
        margin-top: 10px;
    };
    @media(max-width: 588px) {
        font-size: 30px;
    };
`

const ChangeItem = styled.span`
    display: flex;
    margin-left: 5px;
    margin-right: 5px;
`

const PriceIcon = styled.span`
    font-size: 20px;
    height: 20px;
    width: 120x;
    align-self: flex-start;
    margin-top: 4px;
    object-fit: contain;
`

const PriceSpan = styled.span`
    display: flex;
    flex: 0 0 1;
    margin-right: 13px;
`

const DollarIcon = styled.div`
    font-size: 20px;
    height: 24px;
    width: 12px;
    font-weight: 400;
    margin-top: 6px;
`

type ColorProps = {
    color: string
}

const ChangeContainer = styled.div<ColorProps>`
    color: ${(props: ColorProps) => props.color};
    display: flex;
`

export const TickerCard = memo<PriceSingleDataPoint>(({ 
    latestPrice, 
    change, 
    changePercent, 
    error 
    }) => {

    const isPositive = change >= 0;

    return (
        <PriceStats>
            <PriceSpan>
                <DollarIcon>$</DollarIcon>
                {latestPrice.toFixed(2)}
            </PriceSpan>
            <ChangeContainer color={isPositive ? '#91e4a5' : '#e95656'}>
                <ChangeItem>
                    {isPositive ? <PriceIcon>&#129121;</PriceIcon> : <PriceIcon>&#129123;</PriceIcon>}
                    {Math.abs(change).toFixed(2)}
                </ChangeItem> 
                <ChangeItem>|</ChangeItem>
                <ChangeItem>
                    {(changePercent * 100).toFixed(2)}
                    <PriceIcon>%</PriceIcon>
                </ChangeItem> 
            </ChangeContainer>
        </PriceStats>
    )
})
