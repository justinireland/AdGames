export const actions = {
    SET_ACTIVE_CONFIG: 'SET_ACTIVE_CONFIG',
    SET_ACTIVE_VIEW: 'SET_ACTIVE_VIEW',
    SET_GAME_SOCKET: 'SET_GAME_SOCKET'
}

// Set the config of the active Active
export const setActiveConfig = config => (dispatch, getState) => {
    dispatch({ type: actions.SET_ACTIVE_CONFIG, config })
    return new Promise(resolve => resolve(getState()) )
}
// Set the active view/Active
export const setActiveView = (view) => ({ type: actions.SET_ACTIVE_VIEW, view })
export const setGameSocket = GameSocket => ({ type: actions.SET_GAME_SOCKET, GameSocket })