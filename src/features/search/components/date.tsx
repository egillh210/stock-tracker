import React, { memo } from 'react'
import styled from '@emotion/styled'
import moment from 'moment'
const { div, span } = styled;

const DateLayoutContainer = div`
    font-size: 14px;
    display: flex;
    font-weight: 300;
    justify-content: flex-end;
    margin-left: 5px;
`

const Time = span`
    color: rgba(255, 255, 255, 0.8);
    @media(max-width: 750px) {
        display: none;
    }
`

const MarketStatus = span`
    font-size: 14px;
    font-weight: 400;
    display: flex;
    margin-left: 15px;
    position: relative;
`

const MarketIcon = div(props => ({
    color: props.color,
    paddingRight: '5px'
}))

type DateProps = {
    latestUpdate: number,
    isUSMarketOpen: boolean | null
}

export const DateTime = memo<DateProps>(({ 
    latestUpdate, 
    isUSMarketOpen
    }) => {

    const formattedDate = moment(new Date(latestUpdate)).format("lll")

    const color = isUSMarketOpen ? 'yellow' : 'gray';
    
    return (
        <DateLayoutContainer>
            {latestUpdate && <Time>Real-Time Price as of {formattedDate}</Time>}
            <MarketStatus>
                <MarketIcon color={color}>{isUSMarketOpen ? '☀' : '☽'}</MarketIcon>
                {isUSMarketOpen ? 'Market Open' : 'Market Closed'}
            </MarketStatus>
        </DateLayoutContainer>
    )
})