import React from "react";
import JsonObject from './DataTypes/Object';

export default class extends React.Component {
    render = () => {
        const {props} = this;
        const namespace = [props.name];
        return (
            <div class="pretty-json-container object-container" >
                <div class="object-content">
                    <JsonObject
                    namespace={namespace}
                    depth={0}
                    jsvRoot={true}
                    {...props} />
                </div>
            </div>
        );
    }
}