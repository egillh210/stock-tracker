import { 
    ERROR, ErrorAction ,
    RESET_APP_STATE
} from 'redux/actions'

export interface ErrorState {
    keystats: boolean,
    news: boolean,
    company: boolean,
    peers: boolean,
    favorites: boolean,
}

const errorsInitialState: ErrorState = {
    keystats: false,
    news: false,
    company: false,
    peers: false,
    favorites: false,
}

export const errors = (state = errorsInitialState, action: ErrorAction) => {
    const { type, payload } = action;
    switch (type) {
        case ERROR: {
            return {...state, [payload]: true}
        }
        case RESET_APP_STATE: {
            return errorsInitialState;
        }
        default: {
            return state;
        }
    }
}