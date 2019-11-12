import React, { FC } from 'react';
import styled from '@emotion/styled'
import { useSelector } from 'react-redux';
import { PriceSingleDataPoint, AppState } from 'models';
import USMarketsMockData from './USMarketsMockData.json';
import { TickerPrice } from 'features/footer/components';
const { div } = styled;

const FooterLayoutContainer = div`
    position: fixed;
    bottom: 0;
    align-self: flex-end;
    background-image: linear-gradient(to bottom, #00265d, #00204f);
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 60px;
    width: 100%;
    @media(max-width: 588px) {
        display: none;
    };
`

const FavouritesLayoutContainer = div`
    width: 50%;
    overflow: hidden;
    @media(max-width: 1390px) {
        display: none;
    }
`

const MarketsLayoutContainer = div`
    width: 50%;
    overflow: hidden;
    @media(max-width: 1390px) {
        width: 100%;
    }
`

const Header = div`
    width: 67px;
    height: 15px;
    margin-top: 9px;
    margin-bottom: 7px;
    font-family: Lato;
    margin-left: 19px;
    font-size: 12px;
    font-weight: 400;
`

const FooterSection = div`
    margin-left: 19px;
    margin-bottom: 12px;
    height: 17px;
    font-family: Lato;
    display: flex;
    overflow: hidden;
    text-align: left;
`

const Seperator = div`
    opacity: 0.1;
    border: solid 1px white;
    @media(max-width: 1390px) {
        display: none;
    }
`

export const Footer: FC<{}> = () => {

    const prices: PriceSingleDataPoint[] = useSelector(({ prices }: AppState) => prices);
    const favorites: string[] = useSelector(({ favorites }: AppState) => favorites);
    
    const favoritesArray = prices[0] && prices.filter(({ ticker }) => ticker && favorites.includes(ticker)).map(item => <TickerPrice key={item.ticker} {...item} /> );
    const usMarketsArray = USMarketsMockData.map(item => <TickerPrice key={item.ticker} {...item}/>)

    return (
        <FooterLayoutContainer>
            <MarketsLayoutContainer>
                <Header>US MARKET</Header>
                <FooterSection>
                    {usMarketsArray}
                </FooterSection>
            </MarketsLayoutContainer>
            <Seperator />
            <FavouritesLayoutContainer>
                <Header>FAVORITES</Header>
                <FooterSection>
                    {favoritesArray}
                </FooterSection>
            </FavouritesLayoutContainer>
        </FooterLayoutContainer>
    )
}
