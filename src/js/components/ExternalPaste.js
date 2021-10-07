import React, { Component } from 'react';
import Theme from '../themes/getStyle';
import ObjectAttributes from '../stores/ObjectAttributes';
import { ExternalPasteIcon as Paste } from './icons';
import dispatcher from '../helpers/dispatcher';

import regeneratorRuntime from 'regenerator-runtime';

class ExternalPaste extends Component {
    constructor(props) {
        super(props);
    }
    pasteAddKeyRequest = () => {
        const {
            rjvId,
            name,
            src,
            pastedOnObjectOrArray,
            parent_type,
            namespace,
            depth
        } = this.props;
        let request;

        //for parent's namespace last namespace has to be spliced out
        const parentNamespace = [...namespace].splice(0, namespace.length - 1);
        let existingValue = ObjectAttributes.getSrcByNamespace({
            rjvId,
            name: 'global',
            namespace: parentNamespace,
            parent_type
        });
        //find index of paste position
        const dropTargetIdx = pastedOnObjectOrArray
            ? Object.keys(existingValue).findIndex(key => key === name)
            : Object.keys(src).findIndex(key => key === name);
        //if pasted on object or array then the request has to be made with
        // parent's existing value, name and namespace. Therefore an additional step has to be made backwards.
        if (pastedOnObjectOrArray) {
            request = {
                name: namespace[depth - 1],
                namespace: namespace.splice(0, namespace.length - 2),
                existing_value: existingValue,
                dropTargetIdx,
                variable_removed: false,
                key_name: null,
                parent_type
            };
        } else {
            request = {
                name: namespace[depth],
                namespace: namespace.splice(0, namespace.length - 1),
                existing_value: src,
                dropTargetIdx,
                variable_removed: false,
                key_name: null,
                parent_type
            };
        }
        dispatcher.dispatch({
            name: 'PASTE_ADD_KEY_REQUEST',
            rjvId: rjvId,
            data: {
                ...request
            }
        });
    };

    render() {
        const { theme } = this.props;
        return (
            <span
                class="paste-to-json-container"
                title="Paste from external clipboard"
            >
                <Paste
                    class="paste-icon"
                    {...Theme(theme, 'paste-icon')}
                    onClick={this.pasteAddKeyRequest}
                />
            </span>
        );
    }
}

export default ExternalPaste;
