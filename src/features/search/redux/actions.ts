import { createAction } from 'redux-actions'

export const UPDATE_TICKER = 'UPDATE_TICKER';
export const updateTicker = createAction<string>(UPDATE_TICKER)
export type UpdateTickerAction = ReturnType<typeof updateTicker>

export const UPDATE_SELECTED_STOCK = 'UPDATE_SELECTED_STOCK';
export const updateSelectedStock = createAction<string>(UPDATE_SELECTED_STOCK);
export type UpdateSelectedStockAction = ReturnType<typeof updateSelectedStock>;