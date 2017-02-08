import { actions } from './actions'

const initialState = {
    debug: false,
    displaySocket: {},
    gameState: {
        activeTheme: 'coke',
        sessionPieces: [],
        gamePieces: []
    },
    scores: {
        currentGame: [],
        activePlayers: [],
        allTime: [
            {
                name: "Justin I",
                score: 100
            },
            {
                name: "Emily S",
                score: 90
            }
        ],
        week: [
            {
                name: "Brad R",
                score: 30
            },
            {
                name: "Dan C",
                score: 90
            }

        ]
    }
}

export default function Server(state = initialState, action) {

    switch (action.type) {

        case actions.ADD_ACTIVE_PLAYER:
            return {
                ...state,
                scores: {
                    ...state.scores,
                    activePlayers: [
                        ...state.scores.activePlayers,
                        {   ...action.player,
                            score: 0,
                            joinedAt: Date.now()
                        }
                    ],
                    currentGame: [
                        ...state.scores.currentGame,
                        {
                            ...action.player,
                            score: 0
                        }
                    ]
                }
            }
        case actions.INCREMENT_PLAYER_SCORE:
            return {
                ...state,
                scores: {
                    ...state.scores,
                    activePlayers: state.scores.activePlayers.map((activePlayer) =>
                        activePlayer.socketid == action.socketid
                            ? {...activePlayer, score: activePlayer.score += 1}
                            : activePlayer
                    ),
                    currentGame: state.scores.currentGame.map((currentPlayer) =>
                        currentPlayer.socketid == action.socketid
                            ? {...currentPlayer, score: currentPlayer.score += 1}
                            : currentPlayer
                    )
                }
            }
        case actions.REMOVE_ACTIVE_PLAYER:
            return {
                ...state,
                scores: {
                    ...state.scores,
                    activePlayers: state.scores.activePlayers.filter((player) =>
                        player.socketid != action.socketid),
                    currentGame: state.scores.currentGame.filter((player) =>
                        player.socketid != action.socketid)
                }
            }
        case actions.RESET_GAME_SCORE:
            return {
                ...state,
                scores: {
                    ...state.scores,
                    currentGame: state.scores.currentGame.map((currentPlayer) => ({...currentPlayer, score: 0})
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
        case actions.SET_DISPLAY_SOCKET:
            return {
                ...state,
                displaySocket: action.socket
            }
        case actions.SET_GAME_PIECES:
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    gamePieces: action.gamePieces
                }
            }
        case actions.SET_PIECES_MATCH:
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    sessionPieces: state.gameState.sessionPieces.map((sessionPiece,i) =>
                        action.pieces.indexOf(i) >= 0
                            ? {...sessionPiece, hidden: false, matched: true}
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
        default:
            return state
    }
}