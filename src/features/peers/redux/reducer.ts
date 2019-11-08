import { UpdatePeersAction, UPDATE_PEERS } from './actions'
import { RESET_APP_STATE } from '../../../redux/actions/resetApp'

const initialState = ['']

export const peers = (
    state = initialState,
    action: UpdatePeersAction
    ) => {
    const { type, payload } = action
    switch (type) {
        case UPDATE_PEERS: {
            return payload
        }
        case RESET_APP_STATE: {
            return initialState
        }
        default: {
            return state;
        }
    }
}