import { UpdateKeyStatsAction, UPDATE_KEY_STATS } from './actions'
import { KeyStats } from '../models'
import { RESET_APP_STATE } from '../../../redux/actions/resetApp'

const keyStatsInitialState: KeyStats = {
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
    isUSMarketOpen: false,
}

export const keyStats = (
    state = keyStatsInitialState, 
    action: UpdateKeyStatsAction
    ) => {
    const { type, payload } = action
    switch (type) {
        case UPDATE_KEY_STATS: {
            return payload;
        }
        case RESET_APP_STATE: {
            return keyStatsInitialState
        }
        default: {
            return state;
        }
    }
}