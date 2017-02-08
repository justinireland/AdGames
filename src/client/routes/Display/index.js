import React, { Component } from 'react'
import io from 'socket.io-client'
import styles from './styles.css'
// Components
import DefaultView from './components/DefaultView'
import MemoryMatchDisplay from '../../games/MemoryMatch/clients/display'

export default class Display extends Component {
    constructor(props) {
        super(props)

        const ServerSocket = io(`http://${window.env.ip}:8080`)

        this.state = {
            activeView: '',
            activeConfig: {},
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
    render(){

        let ActiveView = <DefaultView />

        if(this.state.activeConfig){

            switch(this.state.activeView){

                case 'MemoryMatch':
                    ActiveView = <MemoryMatchDisplay config={this.state.activeConfig} ServerSocket={this.state.serverSocket} />
                    break

                default:
                    ActiveView = <DefaultView />
                    break
            }
        }

        return(
            <div className="activeView">
                {ActiveView}
            </div>
        )
    }
}