export const actions = {
    ADD_PLAYER: 'ADD_PLAYER',
    REMOVE_PLAYER: 'REMOVE_PLAYER'
}

export function addPlayer(socketID){
    return {
        type: actions.ADD_PLAYER,
        socketID
    }
}
export function removePlayer(socketID){
    return {
        type: actions.REMOVE_PLAYER,
        socketID
    }
}
