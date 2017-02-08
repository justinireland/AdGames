import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { styles } from '../styles'

import LeaderTable from '../components/table'

const leaderBoardStyle = {
    flex: 3,
    zIndex: 99
}

class LeaderBoard extends Component {
    constructor(props) {
        super(props)
    }
    render(){

        const { heading, tableHeader } = this.props.config
        const { scores } = this.props.Display

        const leaderBoardContainer = {
            marginTop: 100,
            width: '30em',
            alignItems: 'center',
            textAlign: 'center'
        }

        return(
            <div id="LeaderBoard" style={{...styles.column, ...leaderBoardStyle}}>
                <div style={leaderBoardContainer}>
                    <h1 style={{color: heading.textColor, fontSize: '3em', marginBottom: '0.5em' }}>LeaderBoards</h1>
                    <LeaderTable
                        title="All Time"
                        tableData={scores.allTime}
                        headerColor={tableHeader.color}
                        textColor={tableHeader.textColor}
                    />
                    <LeaderTable
                        title="This Week"
                        tableData={scores.week}
                        headerColor={tableHeader.color}
                        textColor={tableHeader.textColor}
                    />
                    <LeaderTable
                        title="Playing Now"
                        tableData={scores.activePlayers}
                        headerColor={tableHeader.color}
                        textColor={tableHeader.textColor}
                    />
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

export default connect(mapStateToProps)(LeaderBoard)