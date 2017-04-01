import React from "react";
import JsonObject from './DataTypes/Object';

require('./../../style/app-globals.scss');

export default class extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        const {name, ...rest} = this.props;

        return (
        <div class="pretty-json-container object-container">
            <div class="object-content">
                <JsonObject name={name ? name : 'root'} {...rest} />
            </div>
        </div>
        );
    }
}