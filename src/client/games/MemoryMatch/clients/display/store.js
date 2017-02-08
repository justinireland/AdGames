import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Display } from '../../redux'

const store = createStore(
    combineReducers({Display}),
    applyMiddleware(thunk)
)

export default store