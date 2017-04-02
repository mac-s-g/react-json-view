import React from 'react';


export default class extends React.Component {

    render() {
        const type_name = 'integer';
        return (
        <div class={"object-value " + type_name}>
            <span class="data-type">{type_name}</span>
            {this.props.value}
        </div>
        );
    }

}