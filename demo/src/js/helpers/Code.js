import React from 'react'

export default class extends React.PureComponent {

    render () {
        return <div style={{
            display: "inline-block",
            backgroundColor: "rgb(229, 229, 229)",
            padding: "2px 4px",
            color: 'rgb(153,68,68)',
            fontFamily: 'monospace',
            letterSpacing: '0.8px',
            fontStyle: 'normal'
        }}>
            <span>{this.props.children}</span>
        </div>
    }

}