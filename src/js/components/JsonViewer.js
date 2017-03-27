import React from "react";
import JsonObject from './JsonObject';

require('./../../style/app-globals.scss');

export default class extends React.Component {
    constructor(props) {
        super(props)    
    }

    render = () => {
        const {props} = this;
        return (
        <div class="pretty-json-container">
            <JsonObject {...props}></JsonObject>
        </div>
        );
    }
}