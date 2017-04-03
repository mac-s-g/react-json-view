import React from "react";
import JsonObject from './DataTypes/Object';

require('./../../style/app-globals.scss');

export default class extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        const {props} = this;
        const namespace = [props.name];

        return (
        <div class="pretty-json-container object-container">
            <div class="object-content">
                <JsonObject
                namespace={namespace}
                depth={0}
                {...props} />
            </div>
        </div>
        );
    }
}