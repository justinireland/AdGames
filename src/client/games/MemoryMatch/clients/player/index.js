import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import io from 'socket.io-client'
import makeStore from './store'
import { GameEvents, ServerEvents } from './events'
import { styles } from './styles'
// Redux modules
import { reqPlayerJoin, setPlayerInfo } from '../../redux/player/actions'
// Components
import GameBoard from './containers/GameBoard'

export default class Player extends Component {
    constructor(props) {
        super(props)

        const gameSocket = io(`http://${window.env.ip}:8080/memory-match`)
        const store = makeStore(gameSocket)

        ServerEvents(this.props.ServerSocket, store)
        GameEvents(gameSocket, store)

        store.dispatch(setPlayerInfo(this.props.playerInfo))
            .then((state) => store.dispatch(reqPlayerJoin(this.props.playerInfo)))

        this.state = {
            store: store,
            theme: store.getState().Player.gameState.activeTheme
        }

        gameSocket.on('PUBLIC_GAME_STATE', gameState => this.setState({theme: gameState.activeTheme}))
    }
    render(){

        const config = this.props.config.themes[this.state.theme]
        console.log('config',config)

        return(
            <Provider store={this.state.store}>
                <div style={{...styles.wrapper, ...styles.column, backgroundColor: config.player.backgroundColor}}>
                    <GameBoard config={config} />
                </div>
            </Provider>
        )
    }
}