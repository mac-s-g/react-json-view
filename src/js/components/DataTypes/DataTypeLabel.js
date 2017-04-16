import React from 'react';
import ConfigStore from './../../stores/ConfigStore';


export default class extends React.Component {

    render() {

        if (ConfigStore.get('displayDataTypes', true)) {
            return (
                <span class="data-type">{this.props.type_name}</span>
            );
        } else {
            return <div />
        }

    }

}