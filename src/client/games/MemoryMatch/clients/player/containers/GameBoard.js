import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// Redux modules
import { selectPiece } from '../../../redux/player/actions'
// Components
import GamePiece from '../components/gamePiece'

const gameControls = {
    flexDirection: 'row',
    zIndex: 999,
    padding: 10
}

const pieceContainer = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around'
}

class GameBoard extends Component {
    constructor(props) {
        super(props)
    }
    render(){

        const { gamePiece } = this.props.config
        const gamePieceArr = this.props.Player.gameState.gamePieces
        const score = this.props.Player.score

        const gamePieces = gamePieceArr.map((piece,i) =>
            <GamePiece
                key={i}
                id={i + 1}
                imgSrc={gamePiece.imgFront}
                isSelected={piece.selected}
                onSelect={() => this.props.dispatch(selectPiece(i))}
                highlightTextColor={gamePiece.highlightTextColor}
                textColor={gamePiece.textColor} />
        )

        return(
            <div id="GameController" style={{...gameControls}}>
                <h2>Score: {score}</h2>
                <div id="PieceContainer" style={pieceContainer}>
                    {gamePieces}
                </div>
            </div>
        )
    }
}

function mapStateToProps({Player}, {config}){
    return {
        Player,
        config
    }
}

export default connect(mapStateToProps)(GameBoard)