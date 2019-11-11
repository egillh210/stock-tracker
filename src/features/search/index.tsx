import React, { useState, useEffect, FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../models/appState';
import { TickerCard } from './components/tickerCard';
import styled from '@emotion/styled'
import { socketService } from '../../services/socket-service'
import { SearchBar } from'./components/search-bar'
import { StockList } from './components/stockList'
import { DateTime } from './components/date'
import { Tags } from './components/tags'
import { updateTicker } from './redux/actions';
import { PriceSingleDataPoint } from '../../models/prices';
import { currentPrice } from '../../redux/selectors/prices';

const { div } = styled;

const SearchLayoutContainer = div`
    flex: 1 0 auto;
    margin-bottom: -40px;
    @media(max-width: 1000px) {
        margin-bottom: -20px;
    }
    @media(max-width: 375px) {
        margin-top: 20px;
    }
`

const SearchRowLayoutContainer = div`
    min-height: 48px;
    padding-bottom: 7px;
    position: relative;
    font-size: 40px;
    border-bottom: 1px solid #608fd1;;
    display: flex;
    @media(max-width: 1000px) {
        flex-direction: column-reverse;
    };
    @media(max-width: 588px) {
        font-size: 30px;
    };
`

const DateRowLayoutContainer = div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    @media(max-width: 375px) {
        display: none;
    }
`

export type Stock = {
    name: string,
    symbol: string,
    exchange: string
}

type Selectors = {
    tags: string[],
    primaryExchange: string | null,
    isUSMarketOpen: boolean
}

export type Search = (query: string) => void;

export type ChangeTicker = (stock: Stock) => void;

const socket = socketService.get();

export const Search: FC<{}> = () => {

    const dispatch = useDispatch();

    const [query, setQuery] = useState<string>('');
    const [stockList, setStockList] = useState<Stock[]>([]);
    const [selectedStock, setSelectedStock] = useState<string>('Apple Inc. (AAPL)');

    const {
        tags,
        primaryExchange,
        isUSMarketOpen,
    }: Selectors = useSelector(({
        companyOverview: { tags },
        keyStats: {
            primaryExchange,
            isUSMarketOpen
        },
    }: AppState) => {
        return {
            tags,
            primaryExchange,
            isUSMarketOpen
        }
    });

    const price: PriceSingleDataPoint = useSelector(currentPrice);
    const { latestUpdate } = price;

    const search: Search = useCallback((query: string) => dispatch(updateTicker(query)), [dispatch]);

    const changeTicker: ChangeTicker = useCallback((stock: Stock) => {
        if (stock.hasOwnProperty('symbol')) {
            const { name, symbol } = stock;
            search(symbol);
            setQuery('');
            setSelectedStock(`${name} (${symbol})`);
        }
    }, [search])
    
    useEffect(() => {
        socket.on('search', setStockList)
        socket.on('isValid', changeTicker)
        return () => void socket.off('search', setStockList);
    }, [changeTicker]);

    useEffect(() => {
        query.length && socket.emit('search', query);
    }, [query]);

    return (
        <SearchLayoutContainer>
            <SearchRowLayoutContainer>
                <SearchBar
                    setQuery={setQuery} 
                    query={query} 
                    selectedStock={selectedStock} 
                    socket={socket} 
                />
                <TickerCard {...price} />
                {
                    query.length > 0 && 
                    <StockList 
                        changeTicker={changeTicker}
                        stockList={stockList} 
                    /> 
                }
            </SearchRowLayoutContainer>
            <DateRowLayoutContainer>
                {
                    primaryExchange && 
                    <>
                        <Tags 
                            primaryExchange={primaryExchange} 
                            tags={tags} 
                        />
                        <DateTime 
                            latestUpdate={latestUpdate} 
                            isUSMarketOpen={isUSMarketOpen} 
                        />
                    </>
                }
            </DateRowLayoutContainer>
        </SearchLayoutContainer>
    )

}
