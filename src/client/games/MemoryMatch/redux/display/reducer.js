import { actions } from './actions'

const initialState = {
    config: {},
    debug: true,
    showModal: false,
    gameState: {
        activeTheme: 'coke',
        gamePieces: [],
        sessionPieces: []
    },
    scores: {
        activePlayers: [],
        currentGame: [],
        week: [],
        allTime: []
    }
}

export default function Display(state = initialState, action) {

    switch (action.type) {

        case actions.HIDE_PIECE:
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    sessionPieces: state.gameState.sessionPieces.map((piece,i) => {
                        if(i === action.index && !piece.matched){
                            return {
                                ...piece,
                                hidden: true
                            }
                        } else return piece
                    })
                }
            }
        case actions.SHOW_PIECE:
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    sessionPieces: state.gameState.sessionPieces.map((sessionPiece,i) =>
                        action.index === i
                            ? {...sessionPiece, hidden: false }
                            : sessionPiece
                    )
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
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    gamePieces: action.gamePieces
                }
            }
        case actions.SET_SCORES:
            return {
                ...state,
                scores: {
                    ...state.scores,
                    ...action.scores
                }
            }
        case actions.SET_PIECES_MATCH:
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    sessionPieces: state.gameState.sessionPieces.map((sessionPiece,i) =>
                        action.data.pieces.indexOf(i) >= 0
                            ? {...sessionPiece, hidden: false, matched: true, matchedBy: action.data.matchedBy}
                            : sessionPiece
                    )
                }
            }
        case actions.SET_SESSION_PIECES:
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    sessionPieces: action.sessionPieces
                }
            }
        case actions.TOGGLE_MODAL:
            return {
                ...state,
                showModal: !state.showModal
            }
        default:
            return state
    }
}