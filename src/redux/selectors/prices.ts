import { AppState } from '../../models/appState';

export const currentPrice = (({ prices, search }: AppState) => {
    return prices.find(({ ticker }) => ticker === search) || prices[0];
});