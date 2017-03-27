import React from "react";
import JsonObject from './JsonObject';

require('./../../style/app-globals.scss');

export default class extends React.Component {
    constructor(props) {
        super(props)    
    }

    render = () => {
        const {src} = this.props;
        return (
        <div class="pretty-json-container">
            <JsonObject depth={0} data={src}></JsonObject>
        </div>
        );
    }
}