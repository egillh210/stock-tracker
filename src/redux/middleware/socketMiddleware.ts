import { AnyAction, Middleware } from 'redux'
import { PriceSingleDataPoint } from '../../models/prices'
import { CompanyOverview } from '../../features/companyOverview/models/companyOverview'
import { News } from '../../features/news/models/news'
import { KeyStats } from '../../features/keystats/models/keyStats'
import { ChartSingleDataPoint } from '../../features/charts/models'
import { 
    updatePricesData,
    updateChartData,
    UPDATE_CHART_RANGE,
    resetState,
    updateCompany,
    updateKeyStats,
    updateNews,
    errorAction,
    UPDATE_TICKER
} from '../actions';


const socketMiddleware = (socket: SocketIOClient.Socket, defaultTicker: string = 'aapl'): Middleware => {

    return ({ dispatch, getState }) => {

        socket.on('prices', (prices: PriceSingleDataPoint[]) => dispatch(updatePricesData(prices)));
        socket.on('company', (company: CompanyOverview) => dispatch(updateCompany(company)));
        socket.on('news', (news: News) => dispatch(updateNews(news)));
        socket.on('keystats', (keystats: KeyStats) => dispatch(updateKeyStats(keystats)));
        socket.on('errors', (error: string) => dispatch(errorAction(error)));
        socket.on('chart', (chartData: ChartSingleDataPoint[]) => dispatch(updateChartData(chartData)))
        
        const { favorites, charts: { range } } = getState();
        socket.emit('ticker', defaultTicker);
        socket.emit('prices', [...favorites, defaultTicker]);
        socket.emit('chart', [defaultTicker, range]);
        
        return (next) => (action: AnyAction) => {
            const { type, payload } = action;

            if (type === UPDATE_TICKER) {
                const { favorites, charts: { range } } = getState();
                dispatch(resetState(undefined))
                socket.emit('prices', Array.from(new Set([...favorites, payload])));
                socket.emit('ticker', payload);
                socket.emit('chart', [payload, range])
            }

            if (type === UPDATE_CHART_RANGE) {
                const { ticker } = getState();
                socket.emit('chart', [ticker, payload])
            }

            return next(action)
        }
    }
}

export default socketMiddleware;