// Redux modules
import { setActiveTheme, setConfig, setGamePieces, setScore, setSocketID } from '../../redux/player/actions'

export function ServerEvents(ServerSocket, store){

    ServerSocket.on('INIT_STATE', initState => {
        store.dispatch(setConfig(initState.activeConfig))
    })
}

export function GameEvents(GameSocket, store){

    GameSocket.on('connect', () => {
        store.dispatch(setSocketID(GameSocket.id))
        GameSocket.emit('REQ_GAME_STATE')
    })

    GameSocket.on('SCORE_UPDATE', score => {
        console.log(`SCORE_UPDATE:`, score)
        store.dispatch(setScore(score))
    })

    GameSocket.on('PUBLIC_GAME_STATE', publicGameState => {
        console.log('PUBLIC_GAME_STATE:',publicGameState)
        store.dispatch(setActiveTheme(publicGameState.activeTheme))
        store.dispatch(setGamePieces(publicGameState.numGamePieces))
    })

}