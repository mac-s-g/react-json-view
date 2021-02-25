import React, {Component} from 'react';
import Theme from '../themes/getStyle';
import ObjectAttributes from '../stores/ObjectAttributes';
import { PasteIcon as Paste } from './icons';
import dispatcher from '../helpers/dispatcher';

class PasteToJson extends Component {
    constructor(props) {
        super(props);
    }

    handlePaste = () => {
        const {
            rjvId,
            name,
            src,
            pastedOnObjectOrArray,
            parent_type,
            namespace,
            type,
            depth
        } = this.props;
        const pasteValue = ObjectAttributes.get(rjvId, 'global', 'copied', false);
        let existingValue = ObjectAttributes.getSrcByNamespace(
            rjvId,
            'global',
            [...namespace].splice(0, namespace.length-1),
            type,
            parent_type
        );
        //find index of paste position
        const dropTargetIdx = pastedOnObjectOrArray && parent_type !== 'array' ?
            Object.keys(existingValue).findIndex(key => key === name) :
            Object.keys(src).findIndex(key => key === name);
        const request = {
            name: pastedOnObjectOrArray ? namespace[depth-1] : namespace[depth],
            namespace: pastedOnObjectOrArray ?
                namespace.splice(0, namespace.length - 2) : namespace.splice(0, namespace.length-1),
            existing_value: pastedOnObjectOrArray ?
                existingValue : src,
            pasteValue,
            dropTargetIdx,
            variable_removed: false,
            key_name: null,
            pasted: true
        };
        if (parent_type === 'array') {
            const new_value = [
                // part of the array before the specified index
                ...request.existing_value.slice(0, dropTargetIdx),
                // inserted item
                pasteValue,
                // part of the array after the specified index
                ...request.existing_value.slice(dropTargetIdx)
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
        const copiedValue = ObjectAttributes.get(rjvId, 'global', 'copied', false);
        //if copied value is default value (such as null or '') then this check makes sure to show paste icon
        //after copying something with default value as the value
        let display = copiedValue || copiedValue === defaultValue ? 'inline' : 'none';
        return (
            <span
                className="paste-to-json-container" title="Paste to JSON">
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