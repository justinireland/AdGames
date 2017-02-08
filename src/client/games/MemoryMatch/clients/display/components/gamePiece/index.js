import React, { Component, PropTypes } from 'react'
import FlipCard from 'react-flipcard'
import styles from './styles.css'   // Necessary for loading FlipCard styles

const GamePiece = ({flipped, id, imgFront, textColor, spriteSheet, spriteOffset}) => {

    const cardFrontImg = require(`../../../../assets/img/${imgFront}`)
    const cardRearSprite = require(`../../../../assets/img/${spriteSheet}`)

    const cardWrapperFront = {
        backgroundImage: `url(${cardFrontImg})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 130,
        height: 130
    }
    const cardWrapperRear = {
        ...cardWrapperFront,
        backgroundImage: `url(${cardRearSprite})`,
        backgroundPosition: spriteOffset
    }

    const capText = {
        fontSize: '4.5em',
        color: textColor,
        marginTop: 0,
        marginBottom: 0
    }

    return(
        <FlipCard disabled={true} flipped={flipped}>
            {/* The first child is used as the front of the card */}
            <div style={cardWrapperFront}>
                <h3 style={capText}>{id}</h3>
            </div>
            {/* The second child is used as the back of the card */}
            <div style={cardWrapperRear}></div>
        </FlipCard>
    )
}


export default GamePiece