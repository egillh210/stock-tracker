export interface PriceSingleDataPoint {
    ticker: string,
    latestPrice: number,
    change: number,
    changePercent: number,
    error: boolean,
}

export type Prices = PriceSingleDataPoint[];
