import { createAction } from 'redux-actions'
import { _CompanyOverview } from '../components/companyOverview/models/companyOverview'
import { _KeyStats } from '../components/keystats/models/keyStats'
import { _News } from '../components/news/models/news'
import { _PriceSingleDataPoint } from '../models/prices'

export const UPDATE_TICKER = 'UPDATE_TICKER';
export const updateTicker = createAction<string>(UPDATE_TICKER)
export type UpdateTickerAction = ReturnType<typeof updateTicker>

export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const updateCompany = createAction<_CompanyOverview>(UPDATE_COMPANY)
export type UpdateCompanyAction = ReturnType<typeof updateCompany>

export const UPDATE_KEY_STATS = 'UPDATE_KEY_STATS';
export const updateKeyStats = createAction<_KeyStats>(UPDATE_KEY_STATS)
export type UpdateKeyStatsAction = ReturnType<typeof updateKeyStats>

export const UPDATE_NEWS = 'UPDATE_NEWS';
export const updateNews = createAction<_News>(UPDATE_NEWS)
export type UpdateNewsAction = ReturnType<typeof updateNews>

export const UPDATE_PEERS = 'UPDATE_PEERS';
export const updatePeers = createAction<string[]>(UPDATE_PEERS)
export type UpdatePeersAction = ReturnType<typeof updatePeers>

export const FAVORITES_ADD_TICKER = 'FAVORITES_ADD_TICKER';
export const updateFavoritesAddTicker = createAction<string>(FAVORITES_ADD_TICKER);
export type UpdateFavoritesAddTickerAction = ReturnType<typeof updateFavoritesAddTicker>;

export const FAVORITES_REMOVE_TICKER = 'FAVORITES_REMOVE_TICKER';
export const updateFavoritesRemoveTicker = createAction<string>(FAVORITES_REMOVE_TICKER);
export type UpdateFavoritesRemoveTickerAction = ReturnType<typeof updateFavoritesRemoveTicker>;

export const UPDATE_PRICES_DATA = 'UPDATE_PRICES_DATA';
export const updatePricesData = createAction<_PriceSingleDataPoint[]>(UPDATE_PRICES_DATA);
export type UpdatePricesDataAction = ReturnType<typeof updatePricesData>;

export const RESET_APP_STATE = 'RESET_APP_STATE';
export const resetState = createAction<undefined>(RESET_APP_STATE);
export type ResetStateAction = ReturnType<typeof resetState>