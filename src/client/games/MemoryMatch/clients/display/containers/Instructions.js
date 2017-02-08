import React, { Component, PropTypes } from 'react'
import QRCode from 'qrcode.react'
import { connect } from 'react-redux'
import { styles } from '../styles'

class Instructions extends Component {
    constructor(props) {
        super(props)
    }
    render(){

        const { tableHeader, heading } = this.props.config

        const instructionContainerStyle = {
            flex: 2,
            marginTop: 100,
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 99,
            width: 225,
        }

        const headerStyle = {
            backgroundColor: tableHeader.color,
            color: tableHeader.textColor,
            width: 225,
            textAlign: 'center',
            paddingTop: 10,
            paddingBottom: 10,
            marginBottom: 0,
            marginTop: 0
        }

        const instructionTextContainerStyle = {
            backgroundColor: 'black',
            color: 'white',
            width: 225,
            textAlign: 'center'
        }

        const instructionTextStyle = {
            fontWeight: 'bold',
            fontSize: '1.5em'
        }

        return(
            <div id="Instructions" style={{...styles.column, ...instructionContainerStyle}}>

                    <h1 style={{color: heading.textColor, fontSize: '3em', marginBottom: '0.5em' }}>Instructions</h1>
                    <h1 style={headerStyle}>Step 1</h1>
                    <div style={instructionTextContainerStyle}>
                        <p style={instructionTextStyle}>Connect to WIFI: gbedemo</p>
                    </div>
                    <h1 style={headerStyle}>Step 2</h1>
                    <div style={instructionTextContainerStyle}>
                        <p style={instructionTextStyle}>Scan QR Code or visit http://{window.env.ip}</p>
                    </div>
                <div style={{marginTop: 10}}>
                    <QRCode
                        size={225}
                        //bgColor={secondaryColor}
                        //fgColor={primaryColor}
                        value={`http://${window.env.ip}/player`} />
                </div>

            </div>
        )
    }
}

function mapStateToProps({Display},{socket}){
    return {
        Display,
        socket
    }
}

export default connect(mapStateToProps)(Instructions)