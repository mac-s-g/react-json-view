import React from 'react';


export default class extends React.Component {

    render() {
        const type_name = 'function';
        return (
        <div class={"object-value " + type_name}>
            <span class="data-type">{type_name}</span>
            {this.props.value.toString().slice(9, -1)}
        </div>
        );
    }

}