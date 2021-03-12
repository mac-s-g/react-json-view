import React, {Component} from 'react';
import Theme from '../themes/getStyle';
import ObjectAttributes from '../stores/ObjectAttributes';
import { PasteIcon as Paste } from './icons';
import dispatcher from '../helpers/dispatcher';

import regeneratorRuntime from 'regenerator-runtime';

class PasteToJson extends Component {
    constructor(props) {
        super(props);
    }

    checkForExternalPasteData = async () => {
        return await navigator.clipboard.readText()
            .then( clipData => {
                return clipData;
            })
            .catch( err => {
                return false;
            });
    }

    detectClipboardValueType = value => {
        value = value.trim();
        value = value.replaceAll('\'', '\"');
        const isArray = value[0] === '[' && value[value.length - 1] === ']';
        const isObject = value[0] === '{' && value[value.length - 1] === '}';
        const isFloat = value.match(/\-?\d+\.\d+/) && value.match(/\-?\d+\.\d+/)[0] === value;
        const isInteger = value.match(/\-?\d+/) && value.match(/\-?\d+/)[0] === value;
        const isString = value[0] === '\"' && value[value.length - 1] === '\"';

        if (isArray || isObject) {
            try {
                return JSON.parse(value);
            } catch (e) {
                return e.message;
            }
        }
        else if (isFloat) { return parseFloat(value); }
        else if (isInteger) { return parseInt(value); }
        else if (isString) { return value.substring(1, value.length-1); }

        //if value is undefined, null, true or false (special types)
        let customTypes = value.toLowerCase();
        switch (customTypes) {
        case 'undefined': {
            return undefined;
        }
        case 'null': {
            return null;
        }
        case 'true': {
            return true;
        }
        case 'false': {
            return false;
        }
        }
        //return as string
        return value;
    }

    handlePaste = async () => {
        const {
            rjvId,
            name,
            src,
            pastedOnObjectOrArray,
            parent_type,
            namespace,
            depth
        } = this.props;
        //const pasteValueFromStore = ObjectAttributes.get(rjvId, 'global', 'copied', false);

        let pasteValue = await this.checkForExternalPasteData();
        pasteValue = this.detectClipboardValueType(pasteValue);
        //for parent's namespace last namespace has to be spliced out
        const parentNamespace = [...namespace].splice(0, namespace.length-1);
        let existingValue = ObjectAttributes.getSrcByNamespace({
            rjvId,
            name: 'global',
            namespace: parentNamespace,
            parent_type
        });
        //find index of paste position
        const dropTargetIdx = pastedOnObjectOrArray ?
            Object.keys(existingValue).findIndex(key => key === name) :
            Object.keys(src).findIndex(key => key === name);
        let request;
        //if pasted on object or array then the request has to be made with
        // parent's existing value, name and namespace. Therefore an additional step has to be made backwards.
        if (pastedOnObjectOrArray) {
            request = {
                name: namespace[depth-1],
                namespace: namespace.splice(0, namespace.length - 2),
                existing_value: existingValue,
                pasteValue,
                dropTargetIdx,
                variable_removed: false,
                key_name: null,
                pasted: true
            };
        } else {
            request = {
                name: namespace[depth],
                namespace: namespace.splice(0, namespace.length-1),
                existing_value: src,
                pasteValue,
                dropTargetIdx,
                variable_removed: false,
                key_name: null,
                pasted: true
            };
        }

        if (parent_type === 'array') {
            const new_value = [
                ...request.existing_value.slice(0, dropTargetIdx+1),
                pasteValue,
                ...request.existing_value.slice(dropTargetIdx+1)
            ];
            dispatcher.dispatch({
                name: 'VARIABLE_ADDED',
                rjvId: rjvId,
                data: {
                    ...request,
                    new_value
                }
            });
        } else {
            dispatcher.dispatch({
                name: 'ADD_VARIABLE_KEY_REQUEST',
                rjvId: rjvId,
                data: {
                    ...request,
                },
            });
        }
        ObjectAttributes.set(rjvId, 'global', 'copied', false);
    }

    render() {
        const { theme, rjvId, defaultValue } = this.props;
        let style = Theme(theme, 'paste-to-json').style;
        //currently only clipboard value is used. Store can also be used for holding clipboard value if needed.
        //To do that uncomment line below and setting copied value to store in CopyToClipboard.js
        // const copiedValue = ObjectAttributes.get(rjvId, 'global', 'copied', false);

        const hasExternalPasteData = this.checkForExternalPasteData();
        //if copied value is default value (such as null or '') then this check makes sure to show paste icon
        //after copying something with default value as the value
        //uncomment this to use with store as well
        // let display = hasExternalPasteData || copiedValue || copiedValue === defaultValue ? 'inline' : 'none';
        let display = hasExternalPasteData ? 'inline' : 'none';
        return (
            <span
                className="paste-to-json-container" title="Paste after this">
                <span
                    style={ {
                        ...style,
                        display: display
                    } }>
                    <Paste
                        class='paste-icon'
                        { ...Theme(theme, 'paste-icon') }
                        onClick={ this.handlePaste }
                    />
                </span>
            </span>
        );
    }
}

export default PasteToJson;