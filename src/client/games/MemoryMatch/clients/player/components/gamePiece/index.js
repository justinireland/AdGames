import React, { Component, PropTypes } from 'react'

const GamePiece = ({id, imgSrc, textColor, highlightTextColor, isSelected, onSelect }) => {

    const gamePieceImg = require(`../../../../assets/img/${imgSrc}`)
    const width = screen.width

    const pieceSize = parseInt(((width - 20) / 5) - 10)

    const gamePieceWrapper = {
        backgroundImage: `url(${gamePieceImg})`,
        backgroundSize: pieceSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: pieceSize,
        height: pieceSize,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        marginBottom: 2
    }

    const capText = {
        fontSize: '2em',
        color: isSelected ? highlightTextColor : textColor
    }

    return(
        <div style={{...gamePieceWrapper}} onClick={onSelect}>
            <h3 style={capText}>{id}</h3>
        </div>
    )
}


export default GamePiece