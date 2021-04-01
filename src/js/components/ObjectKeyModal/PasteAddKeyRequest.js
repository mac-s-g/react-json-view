import React from 'react';
import dispatcher from './../../helpers/dispatcher';
import ObjectAttributes from './../../stores/ObjectAttributes';
import ObjectKeyModal from './ObjectKeyModal';
import {
    getExternalClipboardDataType,
    insertToArray,
    insertToObject,
    parseExternalClipboardData
} from '../../helpers/util';

//this input appears when adding a new value to an object or copy/cut pasting something into object
export default class extends React.PureComponent {

    render() {
        const { active, theme, rjvId } = this.props;
        const request = ObjectAttributes.get(
            rjvId, 'action', 'paste-add-key-request'
        );
        return active ? (
            <ObjectKeyModal
                rjvId={ rjvId }
                theme={ theme }
                isValidKeyName={ this.isValidKeyName }
                parsePasteInput={ this.parsePasteInput }
                submit={ this.submit }
                pasted={ true }
                parent_type={ request.parent_type }
            />
        ) : null;
    }

    isValidKeyName = (input) => {
        const { rjvId } = this.props;
        const request = ObjectAttributes.get(
            rjvId, 'action', 'paste-add-key-request'
        );
        return (
            input != ''
            && Object.keys(request.existing_value).indexOf(input) === -1
        );
    }

    parsePasteInput = (input) => {
        const pasteValueType = getExternalClipboardDataType(input);
        return parseExternalClipboardData(pasteValueType, input);
    }

    submit = (input, pasteInput) => {
        const parsedPasteValue = this.parsePasteInput(pasteInput);
        const { rjvId } = this.props;
        let request = ObjectAttributes.get(
            rjvId, 'action', 'paste-add-key-request'
        );
        let { parent_type, dropTargetIdx, existing_value } = request;

        if (parent_type === 'array') {
            const new_value = insertToArray({
                existing_value,
                dropTargetIdx,
                pasteValue: parsedPasteValue
            });
            dispatcher.dispatch({
                name: 'VARIABLE_ADDED',
                rjvId: rjvId,
                data: {
                    ...request,
                    new_value
                }
            });
        } else {
            const newSrc = insertToObject({
                existing_value,
                dropTargetIdx,
                input,
                pasteValue: parsedPasteValue
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
