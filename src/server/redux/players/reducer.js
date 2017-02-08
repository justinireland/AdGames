import { actions } from './actions'
import _ from 'lodash'

const initialState = {
    players: {}
}

export default function Players(state = initialState, action) {

    switch (action.type) {

        case actions.ADD_PLAYER:
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.socketID]: {
                        socket_id: action.socketID
                    }
                }
            }
        case actions.REMOVE_PLAYER:
            return {
                ...state,
                players: _.omit(state.players, action.socketID)
            }
        default:
            return state
    }
}