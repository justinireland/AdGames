import React, { Component, PropTypes } from 'react'
import io from 'socket.io-client'
import styles from './styles.css'
// Components
import SignUp from './components/SignUp'
import MemoryMatchPlayer from '../../games/MemoryMatch/clients/player'

// Needed for onTouchTap: http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default class Player extends Component {
    constructor(props) {
        super(props)

        const ServerSocket = io(`http://${window.env.ip}:8080`)

        this.state = {
            activeView: '',
            activeConfig: {},
            signedIn: false,
            playerInfo: {},
            serverSocket: ServerSocket
        }

        ServerSocket.on('INIT_STATE', initState => {
            console.log('INIT_STATE:', initState)
            this.setState({
                activeView: initState.activeView,
                activeConfig: initState.activeConfig
            })
        })
    }
    handleLogin = (playerInfo) => {
        this.setState({
            playerInfo,
            signedIn: true
        })
    }
    render(){

        let ActiveView = <SignUp
                            config={this.state.activeConfig}
                            handleLogin={this.handleLogin} />

        if(this.state.signedIn && this.state.activeConfig){

            switch(this.state.activeView){

                case 'MemoryMatch':
                    ActiveView = <MemoryMatchPlayer
                                    config={this.state.activeConfig}
                                    playerInfo={this.state.playerInfo}
                                    ServerSocket={this.state.serverSocket} />
                    break

                default:
                    break
            }
        }

        return(
            <div className="viewport">
                {ActiveView}
            </div>
        )
    }
}
