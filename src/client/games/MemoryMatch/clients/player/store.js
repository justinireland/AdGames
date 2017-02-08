import { createStore, combineReducers, applyMiddleware } from 'redux'
import socketIoMiddleware from 'redux-socket.io-middleware'
import thunk from 'redux-thunk'
import { Player } from '../../redux'

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