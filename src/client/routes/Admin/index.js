import React, { Component, PropTypes } from 'react'
import io from 'socket.io-client'
import styles from './styles.css'

// Needed for onTouchTap: http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default class Player extends Component {
    constructor(props) {
        super(props)

        const GameSocket = io(`http://${window.env.ip}:8080/memory-match`)
        const ServerSocket = io(`http://${window.env.ip}:8080`)

        this.state = {
            gameSocket: GameSocket,
            serverSocket: ServerSocket
        }

    }
    handleClick = (theme) => {
        console.log('REQ_SET_THEME: ' + theme)
        this.state.serverSocket.emit('REQ_SET_THEME', theme)
    }
    render(){

        const wrapperStyle = {
            background: '#CCC',
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }

        const buttonStyle = {
            flex: 1,
            textTransform: 'uppercase',
            outline: 0,
            background: '#4CAF50',
            border: 0,
            margin: 10,
            padding: 15,
            color: '#FFFFFF',
            fontSize: 14,
            cursor: 'pointer',
            width: '100%'
        }

        const containerStyle = {
            backgroundColor: 'white',
            boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 30,
            width: '60%'
        }

        return(
            <div id="wrapper" style={wrapperStyle}>
                <div id="signup" style={containerStyle}>
                    <button style={buttonStyle} onClick={() => this.handleClick('coke')}>Coke</button>
                    <button style={buttonStyle} onClick={() => this.handleClick('m&m')}>M&M</button>
                </div>
            </div>
        )
    }
}
