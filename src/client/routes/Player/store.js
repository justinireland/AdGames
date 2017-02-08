import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import socketIoMiddleware from 'redux-socket.io-middleware'
import { Player } from '../redux'

function makeStore(socket) {
    return createStore(
        combineReducers({Player}),
        applyMiddleware(
            socketIoMiddleware(socket),
            thunk
        )
    )
}

export default makeStore