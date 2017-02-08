import React, { Component } from 'react'

export default class SignUp extends Component {
    constructor(props) {
        super(props)
    }
    handleClick = () => {
        return {
            name: document.getElementById('name-input').value,
            email: ''
        }
    }
    render(){

        const containerStyle = {
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
            padding: 15,
            color: '#FFFFFF',
            fontSize: 14,
            cursor: 'pointer',
            width: '100%'
        }

        const inputStyle = {
            flex: 1,
            background: '#f2f2f2',
            boxSizing: 'border-box',
            margin: '0 0 15px',
            padding: 15,
            fontSize: 14,
            width: '100%'
        }

        const signupStyle = {
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
            <div id="signup-wrapper" style={containerStyle}>
                <div id="signup" style={signupStyle}>
                    <input style={inputStyle} id="name-input" placeholder="Your name or nickname" />
                    <button style={buttonStyle} onClick={() => this.props.handleLogin(this.handleClick())}>Submit</button>
                </div>
            </div>
        )
    }
}