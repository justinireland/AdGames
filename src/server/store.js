import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Players, ServerState } from './redux'
// Memory Match
import { Server as MemoryMatch } from '../client/games/MemoryMatch/redux/server'

const store = createStore(
    combineReducers({ Players, ServerState, MemoryMatch }),
    applyMiddleware(thunk)
)

export default store