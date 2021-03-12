import React from 'react';
import dispatcher from './../../helpers/dispatcher';
import ObjectAttributes from './../../stores/ObjectAttributes';
import ObjectKeyModal from './ObjectKeyModal';
import AutosizeTextarea from 'react-textarea-autosize';

//this input appears when adding a new value to an object or copy/cut pasting something into object
export default class extends React.PureComponent {

    render() {
        const {active, theme, rjvId } = this.props;
        const request = ObjectAttributes.get(
            rjvId, 'action', 'paste-add-key-request'
        );
        return active ? (
            <div>
                <ObjectKeyModal
                    rjvId={rjvId}
                    theme={theme}
                    isValid={this.isValid}
                    submit={this.submit}
                    pasted={true}
                    parent_type={request.parent_type}
                />
            </div>
        ) : null;
    }

    isValid = (input) => {
        const {rjvId} = this.props;
        const request = ObjectAttributes.get(
            rjvId, 'action', 'paste-add-key-request'
        );
        return (
            input != ''
            && Object.keys(request.existing_value).indexOf(input) === -1
        );
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

    submit = (input, pasteInput) => {
        let pasteValue = this.detectClipboardValueType(pasteInput);
        const {rjvId} = this.props;
        let request = ObjectAttributes.get(
            rjvId, 'action', 'paste-add-key-request'
        );
        let { parent_type, dropTargetIdx, existing_value } = request;

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
            let newSrc = {};
            Object.keys(request.existing_value).forEach((key, idx) => {
                newSrc[key] = request.existing_value[key];
                //insert after
                if (idx+1 === dropTargetIdx+1) {
                    newSrc[input] = pasteValue;
                }
            });
            dispatcher.dispatch({
                name: 'VARIABLE_ADDED',
                rjvId: rjvId,
                data: {
                    ...request,
                    new_value: newSrc
                }
            });
        }
        ObjectAttributes.set(rjvId, 'global', 'copied', '!noValueCopied!');
    }
}
