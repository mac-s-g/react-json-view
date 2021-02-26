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
        //for parent's namespace last namespace has to be spliced out
        const parentNamespace = [...namespace].splice(0, namespace.length-1);
        let existingValue = ObjectAttributes.getSrcByNamespace(
            rjvId,
            'global',
            parentNamespace,
            type,
            parent_type
        );
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