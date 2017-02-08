import { actions } from './actions'

export const initialState = {
    config: {},
    debug: true,
    gameState: {
        activeTheme: 'coke',
        gamePieces: []
    },
    info: {},
    score: 0,
    socketID: ''
}

export default function Player(state = initialState, action) {

    switch (action.type) {

        case actions.CLEAR_SELECTED:
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    gamePieces: state.gameState.gamePieces.map((gamePiece) => {
                        return {
                            ...gamePiece,
                            selected: false
                        }
                    })
                }
            }
        case actions.SET_ACTIVE_THEME:
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    activeTheme: action.theme
                }
            }
        case actions.SET_CONFIG:
            return {
                ...state,
                config: action.config
            }
        case actions.SET_GAME_PIECES:

            const gamePieces = []
            for(let x = 0; x < action.numGamePieces; x++){
                gamePieces.push({selected: false})
            }

            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    gamePieces: gamePieces
                }
            }
        case actions.SET_PLAYER_INFO:
            return {
                ...state,
                info: action.playerInfo
            }
        case actions.SET_SCORE:
            return {
                ...state,
                score: action.score
            }
        case actions.SET_SELECTED_PIECE:
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    gamePieces: state.gameState.gamePieces.map((gamePiece,i) => {
                        if(i == action.index) {
                            return {
                                ...gamePiece,
                                selected: true
                            }
                        } else return gamePiece
                    })
                }
            }
        case actions.SET_SOCKET_ID:
            return {
                ...state,
                socketID: action.socketid
            }



        default:
            return state
    }
}