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
        const { theme, rjvId, editMode } = this.props;
        let style = Theme(theme, 'paste-to-json').style;
        let display = 'none';
        if (ObjectAttributes.get(rjvId, 'global', 'copied', false)) {
            if (editMode) {
                display = 'none';
            }
            else {
                display = 'inline';
            }
        }
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

    handlePaste = () => {
        const { rjvId, name, namespace, depth, src } = this.props;
        const pasteValue = ObjectAttributes.get(rjvId, 'global', 'copied', false);
        const dropTargetIdx = Object.keys(src).findIndex(key => key === this.props.variable.name);

        const request = {
            name: depth > 0 ? name : null,
            namespace: namespace.splice(
                0, (namespace.length-1)
            ),
            existing_value: src,
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
        ObjectAttributes.set(rjvId, 'global', 'copied', false);
    }

    render() {
        return this.getPasteIcon();
    }
}

export default PasteToJson;