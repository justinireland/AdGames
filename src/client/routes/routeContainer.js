import React, { PropTypes } from 'react'

const RouteContainer = (props) => (
    <main className="viewport">
        {props.children}
    </main>
)

RouteContainer.propTypes = {
    children: PropTypes.node
}

export default RouteContainer