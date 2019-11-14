import { CompanyOverview } from '../features/companyOverview/models/companyOverview'
import { KeyStats } from '../features/keystats/models/keyStats'
import { Charts } from '../features/charts/models/charts'
import { Article } from '../features/news/models/news'
import { PriceSingleDataPoint } from './prices'
import { Error } from './errors';

export type AppState = {
    ticker: string,
    companyOverview: CompanyOverview,
    keyStats: KeyStats,
    charts: Charts,
    news: Article[],
    peers: string[],
    favorites: string[],
    prices: PriceSingleDataPoint[],
    errors: Error
}