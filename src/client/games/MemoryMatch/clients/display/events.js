import store from './store'
// Redux modules
import { showPiece, setActiveTheme, setGamePieces, setScores, setPiecesMatch, setSessionPieces, toggleModal } from '../../redux/display/actions'

export function GameEvents(GameSocket){

    GameSocket.on('connect', () => {
        GameSocket.emit('DISPLAY_JOIN')
    })

    GameSocket.emit('REQ_INIT_GAME')

    GameSocket.on('GAME_OVER', () => {
        console.log('Game Over')
        store.dispatch(toggleModal())
            .then(() => setTimeout(() => {store.dispatch(toggleModal())},5500))
        setTimeout(() => {GameSocket.emit('REQ_INIT_GAME')}, 5000)
    })

    GameSocket.on('PLAYER_UPDATE', scores => {
        console.log(`PLAYER_UPDATE:`, scores)
        store.dispatch(setScores(scores))
    })

    GameSocket.on('PRIVATE_GAME_STATE', privateGameState => {
        console.log('PRIVATE_GAME_STATE:', privateGameState)
        store.dispatch(setActiveTheme(privateGameState.activeTheme))
        store.dispatch(setGamePieces(privateGameState.gamePieces))
        store.dispatch(setSessionPieces(privateGameState.sessionPieces))
        store.dispatch(setScores(privateGameState.scores))
    })

    GameSocket.on('SET_PIECES_MATCH', data => {
        console.log(`SET_PIECES_MATCH:`, data)
        store.dispatch(setPiecesMatch(data))
    })

    GameSocket.on('SHOW_PIECE', index => {
        console.log('SHOW_PIECE ' + index)
        store.dispatch(showPiece(index))
    })

}