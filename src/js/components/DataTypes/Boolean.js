import React from 'react';


export default class extends React.Component {

    render() {
        const type_name = 'boolean';
        if (this.props.value) {
            return <div class={"object-value " + type_name}>
                <span class="data-type">{type_name}</span>
                True
            </div>;

        } else {
            return <div class={"object-value " + type_name}>
                <span class="data-type">{type_name}</span>
                False
            </div>;

        }
    }

}