import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { styles } from '../styles'
// Components
import GamePiece from '../components/gamePiece'
import Modal from '../components/modal'

const gameBoard = {
    flex: 6,
    alignSelf: 'center',
    height: '100%',
    alignItems: 'center',
    zIndex: 99
}
const pieceContainer = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    width: 800
}

class GameBoard extends Component {
    constructor(props) {
        super(props)
    }
    render(){

        const { display, heading, gamePiece } = this.props.config
        const sessionPieces = this.props.Display.gameState.sessionPieces

        const winner = _.reverse(_.sortBy(this.props.Display.scores.currentGame, 'score'))[0]
            ? _.reverse(_.sortBy(this.props.Display.scores.currentGame, 'score'))[0].name
            : ''

        return(
            <div id="GameBoard" style={{...styles.column, ...gameBoard}}>
                <Modal
                    contentLabel="wins!"
                    backgroundColor={display.modal.backgroundColor}
                    textColor={display.modal.textColor}
                    isOpen={this.props.Display.showModal}
                    winner={winner} />
                <h1 style={{color: heading.textColor, fontSize: '5em', marginTop: '0.25em', marginBottom: '0.25em'}}>{heading.text}</h1>
                <div id="pieceContainer" style={pieceContainer}>
                    {sessionPieces
                        ? sessionPieces.map((piece,i) =>
                            <GamePiece
                                key={i}
                                id={i + 1}
                                flipped={!piece.hidden}
                                imgFront={gamePiece.imgFront}
                                textColor={gamePiece.textColor}
                                spriteSheet={gamePiece.spriteSheet}
                                spriteOffset={piece.backgroundPosition} />

                            )
                        : null}
                </div>
            </div>
        )
    }
}

function mapStateToProps({Display}, {config}){
    return {
        Display,
        config
    }
}

export default connect(mapStateToProps)(GameBoard)