import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import io from 'socket.io-client'
import store from './store'
import { GameEvents } from './events'
import { styles } from './styles'
// Redux modules
import { setConfig } from '../../redux/display/actions'
// Components
import GameBoard from './containers/GameBoard'
import Instructions from './containers/Instructions'
import LeaderBoard from './containers/LeaderBoard'

export default class MemoryMatchDisplay extends Component {
    constructor(props) {
        super(props)

        const gameSocket = io(`http://${window.env.ip}:8080/memory-match`)

        GameEvents(gameSocket)

        this.state = {
            theme: store.getState().Display.gameState.activeTheme
        }
    }
    componentWillReceiveProps(){
        store.dispatch(setConfig(this.props.config))
    }
    render(){

        const state = store.getState()
        const theme = state.Display.gameState.activeTheme
        const config = this.props.config.themes[theme]
        const bgImg = config.display.backgroundImg ? require(`../../assets/img/${config.display.backgroundImg}`) : null
        const bgStyle = {
            backgroundImage: `url(${bgImg})`,
            backgroundSize: 'cover',
            display: 'block',
            height: '1080px',
            width: '1920px',
            left: 0,
            top: 0,
            position: 'fixed',
            filter: 'blur(5px)',
            opacity: 0.4,
            zIndex: 1
        }

        return(
            <Provider store={store}>
                <div style={{...styles.wrapper, backgroundColor: config.display.backgroundColor}}>
                    <div style={{...bgStyle}}></div>
                    <LeaderBoard config={config} />
                    <GameBoard config={config} />
                    <Instructions config={config} />
                </div>
            </Provider>
        )
    }
}