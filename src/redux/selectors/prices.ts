import { AppState } from '../../models/appState';

export const currentPrice = (({ prices, ticker: t }: AppState) => {
    return prices.find(({ ticker }) => ticker === t) || prices[0];
});