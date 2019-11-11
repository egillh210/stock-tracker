import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import socketMiddleware from '../redux/middleware/socketMiddleware';
import { socketService } from '../services/socket-service';

import { prices } from '../redux/reducers/price';
import { charts } from '../features/charts/redux/reducer';
import { companyOverview } from '../features/companyOverview/redux/reducer';
import { keyStats } from '../features/keystats/redux/reducer';
import { news } from '../features/news/redux/reducer';
import { peers } from '../features/peers/redux/reducer';
import { search } from '../features/search/redux/reducer';
import { favorites } from '../features/footer/redux/reducer';


const rootReducer = combineReducers({
    search,
    companyOverview,
    keyStats,
    news,
    peers,
    charts,
    favorites,
    prices
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?: typeof compose // module augmentation ts
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(socketMiddleware(socketService.get())),
        composeEnhancers()
    )
);