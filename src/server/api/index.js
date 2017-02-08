import store from '../store'
import { ServerSocket } from '../sockets'
import { setActiveConfig, setActiveView, setGameSocket } from '../redux/serverState/actions'
import { addPlayer, removePlayer } from '../redux/players/actions'

// Memory Match
import MemoryMatchEvents, { reqSetActiveTheme } from '../../client/games/MemoryMatch/api'
import MemoryMatchConfig from '../../client/games/MemoryMatch/config.json'
import { MemoryMatchSocket } from '../sockets'
MemoryMatchEvents(MemoryMatchSocket)

function getServerState(){
    const state = store.getState()

    return {
        activeView: state.ServerState.activeView,
        activeConfig: state.ServerState.activeConfig
    }
}
function playerJoin(playerData,socketid){
    console.log(`Player ${playerData.name} joined`)
    store.dispatch(addPlayer(socketid))
}
function playerLeave(id){
    console.log(`Player ${id} left`)
    store.dispatch(removePlayer(id))
}

function SocketEvents() {

    ServerSocket.on('connection', socket => {

        console.log(`Client ${socket.id} connected`)

        socket.on('disconnect', () => {
            console.log(`Client ${socket.id} disconnected`)
            playerLeave(socket.id)
        })

        socket.emit('INIT_STATE', getServerState())

        socket.on('REQ_PLAYER_JOIN', playerData => {
            console.log('REQ_PLAYER_JOIN', playerData)
            reqPlayerJoin(playerData, `#memory-match/${socket.id}`)
            playerJoin(playerData, socket.id)
        })

        socket.on('REQ_SET_THEME', theme => {
            console.log('REQ_SET_THEME: ' + theme)
            setActiveConfig(MemoryMatchConfig.themes[theme])
            reqSetActiveTheme(theme)
                .then(({MemoryMatch}) => {
                    socket.broadcast.emit('INIT_STATE', getServerState())
                    if(MemoryMatch.displaySocket.emit){
                        // Update only the display
                        MemoryMatch.displaySocket.emit('INIT_STATE', getServerState())
                    }
                })
        })

        socket.on('SET_VIEW', view => {
            console.log(`Setting view to ${view}`)
            store.dispatch(setActiveView(view))

            switch(view){
                case 'MemoryMatch':
                    store.dispatch(setActiveConfig(MemoryMatchConfig))
                    break
            }
        })
    })
}

// Initial setup
store.dispatch(setActiveConfig(MemoryMatchConfig))
store.dispatch(setGameSocket(MemoryMatchSocket))

SocketEvents()

export default SocketEvents
