import React from 'react'
import ReactModal from 'react-modal'

const Modal = ({isOpen, backgroundColor, textColor, contentLabel, winner}) => {

    const customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'none',
            zIndex: 999
        },
        content: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: 'none',
            //backgroundColor: `rgba(${backgroundColor}, 0.85)`,
            overflow: 'none',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '0px',
            outline: 'none',
            padding: '20px'
        }
    }
    const flexWrapper = {
        backgroundColor: backgroundColor,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const textStyle = {
        color: textColor,
        fontSize: '14em',
        fontWeight: 'bold',
        textAlign: 'center'
    }

    return (
        <ReactModal
            style={customStyles}
            isOpen={isOpen}
            contentLabel={contentLabel}>
            <div style={flexWrapper}>
                <span style={textStyle}>{winner}<br/>{contentLabel}</span>
            </div>
        </ReactModal>
    )
}

export default Modal