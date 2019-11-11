import { UpdateTickerAction, UPDATE_TICKER } from './actions';
import { Reducer } from 'redux';

export const search: Reducer<string, UpdateTickerAction> = (
    state = 'aapl', 
    action
) => {
    const { type, payload } = action
    switch(type) {
        case UPDATE_TICKER: {
            return payload;
        }
        default: {
            return state;
        }
    }
};