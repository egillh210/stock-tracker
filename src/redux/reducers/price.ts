import { UpdatePricesDataAction, UPDATE_PRICES_DATA } from '../actions/price'
import { Prices } from '../../models/prices'

const pricesInitialState: Prices = [
    { 
        ticker: 'aapl', 
        change: 0, 
        changePercent: 0, 
        latestPrice: 0, 
        latestUpdate: 0,
        error: false 
    }
];

// const pricesInitialState: Prices | [] = [];

export const prices = (state = pricesInitialState, action: UpdatePricesDataAction) => {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_PRICES_DATA: {
            return payload;
        }
        default: {
            return state;
        }
    }
}