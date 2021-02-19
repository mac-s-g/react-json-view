import React, {Component} from 'react';
import Theme from '../themes/getStyle';
import ObjectAttributes from '../stores/ObjectAttributes';
import {Paste} from './icons';
import dispatcher from '../helpers/dispatcher';

class PasteToJson extends Component {
    constructor(props) {
        super(props);
    }

    getPasteIcon = () => {
        const { theme, rjvId } = this.props;
        let style = Theme(theme, 'paste-to-json').style;
        let display = ObjectAttributes.get(rjvId, 'global', 'copied', false) ? 'inline' : 'none';
        return (
            <span
                class="paste-to-json-container" title="Paste to JSON">
                <span
                    style={{
                        ...style,
                        display: display
                    }}>
                    <Paste
                        class='paste-icon'
                        {...Theme(theme, 'paste-icon')}
                        onClick={this.handlePaste}
                    />
                </span>
            </span>
        );
    }

    pasteInArray = (request, pasteValue) => {
        const { rjvId, src } = this.props;
        dispatcher.dispatch({
            name: 'VARIABLE_ADDED',
            rjvId: rjvId,
            data: {
                ...request,
                new_value: [...src, pasteValue]
            }
        });
    }

    pasteOnObjectOrVariable = (request) => {
        const { rjvId } = this.props;
        dispatcher.dispatch({
            name: 'ADD_VARIABLE_KEY_REQUEST',
            rjvId: rjvId,
            data: {
                ...request,
            },
        });
    }

    handlePaste = () => {
        let {
            rjvId,
            name,
            namespace,
            src,
            variable,
            depth,
            type,
            pastedOnObjectOrArray,
            parent_type
        } = this.props;
        //if no copy value in store then paste value will be false
        //should maybe change to not clear store after pasting?
        const pasteValue = ObjectAttributes.get(rjvId, 'global', 'copied', false);
        const dropTargetIdx = pastedOnObjectOrArray ?
            Object.keys(ObjectAttributes.get(rjvId, 'global', 'src')).findIndex(key => key === name) :
            Object.keys(src).findIndex(key => key === variable.name);
        //if pasted on array then make it add to array
        const request = {
            name: pastedOnObjectOrArray ? null : namespace[depth],
            namespace: namespace.splice(0, namespace.length - 1),
            existing_value: pastedOnObjectOrArray ?
                ObjectAttributes.get(rjvId, 'global', 'src') : src,
            pasteValue,
            dropTargetIdx,
            variable_removed: false,
            key_name: null,
            pasted: true
        };
        //if pasted on array
        if (type === 'array') {
            //if pasted on outer level of array and parent is not an array
            //then it should be appended to the parent array
            //BUG appears when pasting something on top of an array inside an array
            //something like this:
            //el: [
                //1: true,
                //2: [ <------- PASTE ON HERE, inside paste works fine
                    //11: 'test',
                    //22: false
                //]
            //]
            if (pastedOnObjectOrArray !== undefined && parent_type === 'array') {
                this.pasteInArray(request, pasteValue);
            }
            //if pasted inside array then append it to the end of the array
            else {
                dispatcher.dispatch({
                    name: 'ADD_VARIABLE_KEY_REQUEST',
                    rjvId: rjvId,
                    data: {
                        ...request,
                    },
                });
            }
        }
        //if pasted on a variable or object
        else {
            this.pasteOnObjectOrVariable(request);
        }
        ObjectAttributes.set(rjvId, 'global', 'copied', false);
    }

    render() {
        return this.getPasteIcon();
    }
}

export default PasteToJson;