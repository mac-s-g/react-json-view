import React, {Component} from 'react';
import Theme from '../themes/getStyle';
import ObjectAttributes from '../stores/ObjectAttributes';
import { PasteIcon as Paste } from './icons';
import dispatcher from '../helpers/dispatcher';

class PasteToJson extends Component {
    constructor(props) {
        super(props);
    }

    pasteInArray = (dropTargetIdx) => {
        const {
            rjvId,
            namespace,
            parent_type,
            depth,
            pastedOnObjectOrArray,
            src,
            type
        } = this.props;
        const pasteValue = ObjectAttributes.get(rjvId, 'global', 'copied', false);
        let request;

        //pasted on variable inside array
        if (parent_type === 'array' && type === 'array' && !pastedOnObjectOrArray) {
            request = {
                name: namespace[depth],
                namespace: namespace.splice(0, (namespace.length - 1)),
                existing_value: src,
                variable_removed: false,
                key_name: null,
                pasted: true
            };
        }
        //pasted on object or array inside array
        else {
            let existingValue = ObjectAttributes.getSrcByNamespace(
                rjvId,
                'global',
                [...namespace].splice(0, namespace.length-1)
            );
            request = {
                name: namespace[depth-1],
                namespace: namespace.splice(0, (namespace.length - 2)),
                existing_value: existingValue,
                variable_removed: false,
                key_name: null,
                pasted: true
            };
        }
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
    }

    pasteOnArrayOnObjectOnVariable = (dropTargetIdx) => {
        const {
            rjvId,
            pastedOnObjectOrArray,
            namespace,
            depth,
            src,
            type,
            parent_type
        } = this.props;
        let existingValue = ObjectAttributes.getSrcByNamespace(
            rjvId,
            'global',
            [...namespace].splice(0, namespace.length-1),
            type,
            parent_type
        );
        const pasteValue = ObjectAttributes.get(rjvId, 'global', 'copied', false);
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
        dispatcher.dispatch({
            name: 'ADD_VARIABLE_KEY_REQUEST',
            rjvId: rjvId,
            data: {
                ...request,
            },
        });
    }

    handlePaste = () => {
        const {
            rjvId,
            name,
            src,
            pastedOnObjectOrArray,
            parent_type,
            namespace,
            type
        } = this.props;
        //if no copy value in store then paste value will be false
        //should maybe change to not clear store after pasting?
        //find index of place position
        const dropTargetIdx = pastedOnObjectOrArray && parent_type !== 'array' ?
            Object.keys(ObjectAttributes.getSrcByNamespace(
                rjvId,
                'global',
                [...namespace].splice(0, namespace.length-1),
                type,
                parent_type
            )).findIndex(key => key === name) :
            Object.keys(src).findIndex(key => key === name);
        //pasted inside array or not
        parent_type === 'array' ?
            this.pasteInArray(dropTargetIdx)
            : this.pasteOnArrayOnObjectOnVariable(dropTargetIdx);
        ObjectAttributes.set(rjvId, 'global', 'copied', false);
    }

    render() {
        const { theme, rjvId } = this.props;
        let style = Theme(theme, 'paste-to-json').style;
        let display = ObjectAttributes.get(rjvId, 'global', 'copied', false) ? 'inline' : 'none';
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