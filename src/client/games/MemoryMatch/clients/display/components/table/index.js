import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import styles from './styles.css'

const Table = ({headerColor, title, textColor, tableData}) => {

    const tableStyle = {
        border: `1px solid ${textColor}`
    }

    const rows = _.reverse(_.sortBy(tableData, ['score'])).map((rowData,i) =>
        <tr key={i}>
            <td className="text-left">{rowData.name}</td>
            <td className="text-right">{rowData.score}</td>
        </tr>
    )

    return(
        <div style={{marginBottom: '0'}}>
            <table className="table-fill" style={{tableStyle}}>
                <thead>
                    <tr>
                        <th colSpan="2" style={{color: textColor ,background: headerColor}}>
                            {title}
                        </th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    )
}


export default Table