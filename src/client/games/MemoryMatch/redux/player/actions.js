// Local Actions
export const actions = {
    CLEAR_SELECTED: 'CLEAR_SELECTED',
    SELECT_PIECE: 'SELECT_PIECE',
    SET_ACTIVE_THEME: 'SET_ACTIVE_THEME',
    SET_CONFIG: 'SET_CONFIG',
    SET_GAME_PIECES: 'SET_GAME_PIECES',
    SET_PLAYER_INFO: 'SET_PLAYER_INFO',
    SET_SCORE: 'SET_SCORE',
    SET_SELECTED_PIECE: 'SET_SELECTED_PIECE',
    SET_SOCKET_ID: 'SET_SOCKET_ID'
}
// Clears selected pieces
export const clearSelected = () => ({
    type: actions.CLEAR_SELECTED
})
// Catches all requests for setSelectedPiece
export const selectPiece = index => (dispatch, getState) => {

    const state = getState()
    let numSelected = 0

    state.Player.gameState.gamePieces.filter((gamePiece, i) => gamePiece.selected ? numSelected += 1 : null )

    if(numSelected <= 1){
        // Set local state of piece
        dispatch(setSelectedPiece(index))
        // Dispatch action to server to show piece
        dispatch(reqShowPiece(index))
    }

    if(numSelected == 1){

        let selectedPieces = [index]
        state.Player.gameState.gamePieces.filter( (gamePiece,i) => {
            if(gamePiece.selected){
                selectedPieces.push(i)
            }
        })
        // Dispatch action to server to check for match
        dispatch(reqMatchPieces(selectedPieces))

        // Clear selected pieces after 1s
        setTimeout(() => dispatch(clearSelected()),500)
    }
}
// Change MemoryMatch theme
export const setActiveTheme = theme => ({
    type: actions.SET_ACTIVE_THEME,
    theme
})
// Set memorymatch config
export const setConfig = config => ({
    type: actions.SET_CONFIG,
    config
})
// Set game pieces
export const setGamePieces = numGamePieces => ({
    type: actions.SET_GAME_PIECES,
    numGamePieces
})
export const setPlayerInfo = playerInfo => (dispatch, getState) => {
    dispatch({ type: actions.SET_PLAYER_INFO, playerInfo})
    return new Promise((resolve) => resolve(getState()))
}
export const setScore = score => ({
    type: actions.SET_SCORE,
    score
})
// Set a piece as selected
export const setSelectedPiece = index => ({
    type: actions.SET_SELECTED_PIECE,
    index
})
export const setSocketID = socketid => ({
    type: actions.SET_SOCKET_ID,
    socketid
})

// Remote Actions
export const remoteActions = {
    REQ_GAME_STATE: 'REQ_GAME_STATE',
    REQ_MATCH_PIECES: 'REQ_MATCH_PIECES',
    REQ_PLAYER_JOIN: 'REQ_PLAYER_JOIN',
    REQ_SHOW_PIECE: 'REQ_SHOW_PIECE'
}
export const reqPlayerJoin = playerInfo => ({
    type: remoteActions.REQ_PLAYER_JOIN, meta: {remote: true}, playerInfo})
export const reqShowPiece = index => ({
    type: remoteActions.REQ_SHOW_PIECE,
    meta: {remote: true},
    index
})
// Send a match pair to server for evaluation
export const reqMatchPieces = pieces => ({
    type: remoteActions.REQ_MATCH_PIECES,
    meta: {remote: true},
    pieces
})
