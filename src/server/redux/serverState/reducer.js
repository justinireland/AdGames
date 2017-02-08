import { actions } from './actions'

const initialState = {
    activeView: 'MemoryMatch',
    activeConfig: {},
    GameSocket: {}
}

export default function ServerState(state = initialState, action) {

    switch (action.type) {

        case actions.SET_ACTIVE_CONFIG:
            return {
                ...state,
                activeConfig: action.config
            }
        case actions.SET_ACTIVE_VIEW:
            return {
                ...state,
                activeView: action.view
            }
        case actions.SET_GAME_SOCKET:
            return {
                ...state,
                GameSocket: action.GameSocket
            }
        default:
            return state
    }
}