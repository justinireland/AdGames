
export const actions = {
    ADD_ACTIVE_PLAYER: 'ADD_ACTIVE_PLAYER',
    INCREMENT_PLAYER_SCORE: 'INCREMENT_PLAYER_SCORE',
    REMOVE_ACTIVE_PLAYER: 'REMOVE_ACTIVE_PLAYER',
    RESET_GAME_SCORE: 'RESET_GAME_SCORE',
    SET_ACTIVE_THEME: 'SET_ACTIVE_THEME',
    SET_DISPLAY_SOCKET: 'SET_DISPLAY_SOCKET',
    SET_GAME_PIECES: 'SET_GAME_PIECES',
    SET_PIECES_MATCH: 'SET_PIECES_MATCH',
    SET_SESSION_PIECES: 'SET_SESSION_PIECES'
}

export const addActivePlayer = player => (dispatch, getState) => {
    dispatch({type: actions.ADD_ACTIVE_PLAYER, player})
    return new Promise((resolve) => resolve(getState()))
}
export const incrementPlayerScore = socketid => (dispatch, getState) => {
    dispatch({type: actions.INCREMENT_PLAYER_SCORE, socketid})
    return new Promise((resolve) => resolve(getState()))
}
export const removeActivePlayer = socketid => (dispatch, getState) => {
    dispatch({type: actions.REMOVE_ACTIVE_PLAYER, socketid})
    return new Promise((resolve) => resolve(getState()))
}
export const resetGameScore = () => ({ type: actions.RESET_GAME_SCORE })
export const setActiveTheme = theme => (dispatch, getState) => {
    dispatch({ type: actions.SET_ACTIVE_THEME, theme})
    return new Promise((resolve) => resolve(getState()))
}
export const setDisplaySocket = socket => ({ type: actions.SET_DISPLAY_SOCKET, socket})
export const setGamePieces = gamePieces => ({ type: actions.SET_GAME_PIECES, gamePieces})
export const setPiecesMatch = pieces => (dispatch, getState) => {
    dispatch({ type: actions.SET_PIECES_MATCH, pieces })
    return new Promise((resolve) => resolve(getState()))
}
export const setSessionPieces = sessionPieces => ({ type: actions.SET_SESSION_PIECES, sessionPieces})