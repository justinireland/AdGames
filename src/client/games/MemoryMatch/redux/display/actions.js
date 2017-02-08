export const actions = {
    HIDE_PIECE: 'HIDE_PIECE',
    SHOW_PIECE: 'SHOW_PIECE',
    SET_ACTIVE_THEME: 'SET_ACTIVE_THEME',
    SET_CONFIG: 'SET_CONFIG',
    SET_GAME_PIECES: 'SET_GAME_PIECES',
    SET_SCORES: 'SET_SCORES',
    SET_PIECES_MATCH: 'SET_PIECES_MATCH',
    SET_SESSION_PIECES: 'SET_SESSION_PIECES',
    TOGGLE_MODAL: 'TOGGLE_MODAL'
}

export const hidePiece = index => ({ type: actions.HIDE_PIECE, index})
export const showPiece = index => (dispatch) => {
    dispatch({ type: actions.SHOW_PIECE, index})
    setTimeout(() => dispatch(hidePiece(index)),1000)
}
export const setActiveTheme = theme => ({ type: actions.SET_ACTIVE_THEME, theme})
export const setConfig = config => ({ type: actions.SET_CONFIG, config})
export const setGamePieces = gamePieces => ({ type: actions.SET_GAME_PIECES, gamePieces})
export const setScores = scores => ({type: actions.SET_SCORES, scores})
export const setPiecesMatch = data => ({type: actions.SET_PIECES_MATCH, data})
export const setSessionPieces = sessionPieces => ({ type: actions.SET_SESSION_PIECES, sessionPieces})
export const toggleModal = () => (dispatch,getState) => {
    dispatch({ type: actions.TOGGLE_MODAL })
    return new Promise((resolve) => resolve(getState()))
}