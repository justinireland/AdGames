import io from 'socket.io'
import _ from 'lodash'
import store from '../../../../server/store'
import { addActivePlayer, incrementPlayerScore, removeActivePlayer, resetGameScore, setActiveTheme, setDisplaySocket, setGamePieces, setPiecesMatch, setSessionPieces } from '../redux/server/actions'
const config = require('../config.json')

function initGame(){
    console.log('initGame()')
    const state = store.getState()
    const theme = state.MemoryMatch.gameState.activeTheme
    const displaySocket = state.MemoryMatch.displaySocket

    // Load the default pieces from config
    let gamePieces = config.themes[theme].gamePieces
    let sessionPieces = []

    // If less than 15 pieces
    do {
        gamePieces = gamePieces.concat(gamePieces)
    } while (gamePieces.length < 15)

    // Trim to 15 pieces = 30 total
    gamePieces = gamePieces.slice(0,15)
    // Load game pieces twice
    sessionPieces = gamePieces.concat(gamePieces)
    // Randomize order
    sessionPieces = _.shuffle(sessionPieces)

    // Add new keys
    sessionPieces = sessionPieces.map((gamePiece) => {
        return {
            ...gamePiece,
            hidden: true,
            matched: false
        }
    })

    // Update store
    store.dispatch(setGamePieces(config.themes[theme].gamePieces))
    store.dispatch(setSessionPieces(sessionPieces))
    store.dispatch(resetGameScore())
    // Emit state
    displaySocket.emit('PRIVATE_GAME_STATE', getPrivateGameState())
    displaySocket.broadcast.emit('PUBLIC_GAME_STATE', getPublicGameState())


}
function doPiecesMatch(pieces){
    console.log(`getPiecesMatch(${pieces})`)

    const state = store.getState()
    let sessionPieces = []

    pieces.map((index) => {
        sessionPieces.push(state.MemoryMatch.gameState.sessionPieces[index])
    })

    // Return T/F
    return (sessionPieces.filter((piece) => sessionPieces[0].name == piece.name && !piece.matched).length == sessionPieces.length)

}
// Reveals game state without the solution set (sessionPieces)
function getPrivateGameState(){
    const state = store.getState()

    return {
        activeTheme: state.MemoryMatch.gameState.activeTheme,
        scores: state.MemoryMatch.scores,
        gamePieces: state.MemoryMatch.gameState.gamePieces,
        sessionPieces: state.MemoryMatch.gameState.sessionPieces
    }
}
// Reveals game state with the solution set (sessionPieces)
function getPublicGameState(){
    const state = store.getState()

    return {
        activeTheme: state.MemoryMatch.gameState.activeTheme,
        numGamePieces: state.MemoryMatch.gameState.sessionPieces.length
    }
}

export function reqSetActiveTheme(theme){
    store.dispatch(setActiveTheme(theme))
        .then(({MemoryMatch}) => initGame())
    return new Promise(resolve => resolve(store.getState()))
}

export default function MemoryMatchEvents(GameSocket,ServerSocket) {

    GameSocket.on('connection', socket => {

        socket.on('disconnect', () => {
            console.log('Player disconnected')
            store.dispatch(removeActivePlayer(socket.id))
                .then(({MemoryMatch}) => {
                    if (MemoryMatch.displaySocket.emit) {
                        // Update only the display
                        MemoryMatch.displaySocket.emit('PLAYER_UPDATE', MemoryMatch.scores)
                    }
                })
            }
        )

        socket.on('DISPLAY_JOIN', () => store.dispatch(setDisplaySocket(socket)))

        socket.on('REQ_GAME_STATE', () => socket.emit('PUBLIC_GAME_STATE', getPublicGameState()))

        socket.on('REQ_INIT_GAME', () => initGame())

        socket.on('REQ_PLAYER_JOIN', playerData => {
            store.dispatch(addActivePlayer({...playerData, socketid: socket.id}))
                .then(({MemoryMatch}) => {
                    if(MemoryMatch.displaySocket.emit){
                        // Update only the display
                        MemoryMatch.displaySocket.emit('PLAYER_UPDATE', MemoryMatch.scores)
                    }
                })
        })

        socket.on('action', action => {

            switch (action.type) {

                case 'REQ_SHOW_PIECE':
                    const state = store.getState()
                    const displaySocket = state.MemoryMatch.displaySocket
                    const sessionPieces = state.MemoryMatch.gameState.sessionPieces

                    if(!sessionPieces[action.index].matched){
                        displaySocket.emit('SHOW_PIECE', action.index)
                    }
                    break

                case 'REQ_MATCH_PIECES':
                    if(doPiecesMatch(action.pieces)){
                        store.dispatch(setPiecesMatch(action.pieces))
                            .then((state) => {
                                const displaySocket = state.MemoryMatch.displaySocket

                                displaySocket.emit('SET_PIECES_MATCH', {pieces: action.pieces, matchedBy: socket.id})

                                store.dispatch(incrementPlayerScore(socket.id))
                                    .then((state) => {
                                        socket.emit('SCORE_UPDATE', _.find(state.MemoryMatch.scores.activePlayers, {socketid: socket.id}).score)
                                        displaySocket.emit('PLAYER_UPDATE', state.MemoryMatch.scores)
                                    })


                                const matchedPieces = state.MemoryMatch.gameState.sessionPieces.filter((sessionPiece) => sessionPiece.matched).length

                                // If all the pieces are matched
                                if(matchedPieces == 30){
                                    console.log('Game Over!')
                                    displaySocket.emit('GAME_OVER')
                                }
                            })
                    }
                    break

                case 'REQ_PLAYER_JOIN':
                    console.log('REQ_PLAYER_JOIN:', action.playerInfo)
                    store.dispatch(addActivePlayer({...action.playerInfo, socketid: socket.id}))
                        .then(({MemoryMatch}) => {
                            if(MemoryMatch.displaySocket.emit){
                                // Update only the display
                                MemoryMatch.displaySocket.emit('PLAYER_UPDATE', MemoryMatch.scores)
                            }
                        })
            }
        })
    })
}