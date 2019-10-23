import { combineReducers, Reducer } from 'redux';
import { UpdateTickerAction, UPDATE_TICKER, 
        UpdateKeyStatsAction, UPDATE_KEY_STATS, 
        UpdateCompanyAction, UPDATE_COMPANY, 
        UpdateNewsAction, UPDATE_NEWS, 
        UpdatePeersAction, UPDATE_PEERS,
        UpdateFavoritesAddTickerAction, FAVORITES_ADD_TICKER,
        UpdateFavoritesRemoveTickerAction, FAVORITES_REMOVE_TICKER,
        UpdatePricesDataAction, UPDATE_PRICES_DATA,
        ResetStateAction, RESET_APP_STATE
     } from './actions'
import { _CompanyOverview } from '../components/companyOverview/models/companyOverview'
import { _KeyStats } from '../components/keystats/models/keyStats'
import { _Charts } from '../components/charts/models/charts'
import { _News } from '../components/news/models/news'
import { _Prices } from '../models/prices'

export interface _AppState {
    search: string,
    companyOverview: _CompanyOverview,
    keyStats: _KeyStats,
    charts: _Charts,
    news: _News,
    peers: string[],
    favorites: string[],
    prices: _Prices,
}

const companyOverviewInitialState: _CompanyOverview = {
    symbol: null,
    companyName: null,
    website: null,
    description: null,
    tags: [],
}

const keyStatsInitialState: _KeyStats = {
    marketCap: null,
    peRatio: null,
    week52High: null,
    week52Low: null,
    avgTotalVolume: null,
    previousClose: null,
    low: null,
    high: null,
    volume: null,
    open: null,
    dividendYield: null,
    actualEPS: null,
    primaryExchange: null,
    latestTime: null,
    isUSMarketOpen: false,
    isFetchingQuote: false,
}

const newsInitialState: _News = []

const favoritesInitialState: string[] = ['amzn', 'msft', 'fb']

const pricesInitialState: _Prices = [{ ticker: 'aapl', change: 0, changePercent: 0, latestPrice: 0 }]

export const search: Reducer<string, UpdateTickerAction> = (
    state = 'aapl', 
    action
) => {
    switch(action.type) {
        case UPDATE_TICKER: {
            const updateTickerAction = action as UpdateTickerAction
            const { payload } = updateTickerAction;
            return payload;
        }
        default: {
            return state;
        }
    }
};

export const companyOverview = (
    state = companyOverviewInitialState, 
    action: UpdateCompanyAction | ResetStateAction
    ) => {
    switch (action.type) {
        case UPDATE_COMPANY: {
            const updateCompanyAction = action as UpdateCompanyAction
            const { payload } = updateCompanyAction;
            return payload;
        }
        case RESET_APP_STATE: {
            return companyOverviewInitialState
        }
        default: {
            return state;
        }
    }
}

export const keyStats = (
    state = keyStatsInitialState, 
    action: UpdateKeyStatsAction
    ) => {
    switch (action.type) {
        case UPDATE_KEY_STATS: {
            const updateKeyStatsAction = action as UpdateKeyStatsAction 
            const { payload } = updateKeyStatsAction;
            return ({ ...state, ...payload });
        }
        case RESET_APP_STATE: {
            return keyStatsInitialState
        }
        default: {
            return state;
        }
    }
}

export const news = (
    state = newsInitialState,
    action: UpdateNewsAction
    ) => {
    switch (action.type) {
        case UPDATE_NEWS: {
            const updateNewsAction = action as UpdateNewsAction
            const { payload } = updateNewsAction;
            return payload;
        }
        case RESET_APP_STATE: {
            return newsInitialState
        }
        default: {
            return state;
        }
    }
}

export const peers = (
    state = [''],
    action: UpdatePeersAction
    ) => {
    switch (action.type) {
        case UPDATE_PEERS: {
            const updatePeersAction = action as UpdatePeersAction
            const { payload } = updatePeersAction;
            return payload
        }
        case RESET_APP_STATE: {
            return ['']
        }
        default: {
            return state;
        }
    }
}

export const favorites = (
    state = favoritesInitialState,
    action: UpdateFavoritesAddTickerAction | UpdateFavoritesRemoveTickerAction
    ) => {
    const { type } = action;
    switch (type) {
        case FAVORITES_ADD_TICKER: {
            const updateFavoritesAddTickerAction = action as UpdateFavoritesAddTickerAction;
            const { payload } = updateFavoritesAddTickerAction;
            return ([
                ...state,
                payload
            ])
        }
        case FAVORITES_REMOVE_TICKER: {
            const updateFavoritesRemoveTickerAction = action as UpdateFavoritesRemoveTickerAction;
            const { payload } = updateFavoritesRemoveTickerAction;
            return state.filter(ticker => ticker !== payload)
        }
        default: {
            return state;
        }
    }
}

export const prices = (state = pricesInitialState, action: UpdatePricesDataAction) => {
    const { type } = action;
    switch (type) {
        case UPDATE_PRICES_DATA: {
            const updatePricesDataAction = action as UpdatePricesDataAction;
            const { payload } = updatePricesDataAction;
            return payload;
        }
        default: {
            return state;
        }
    }
}
