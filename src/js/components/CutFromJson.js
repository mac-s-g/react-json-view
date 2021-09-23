import React, { Component } from 'react';
import { CutIcon as Cut } from './icons';
import Theme from '../themes/getStyle';
import dispatcher from '../helpers/dispatcher';
import ObjectAttributes from '../stores/ObjectAttributes';
import { toType } from '../helpers/util';

class CutFromJson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cutClicked: false
        };
    }

    handleCut = () => {
        const { hidden, rjvId, name, src, namespace } = this.props;
        //set cut value to clipboard
        this.addToClipboard();
        ObjectAttributes.set(rjvId, 'global', 'copied', src);
        //hidden props is declared only for variables
        dispatcher.dispatch({
            name: 'VARIABLE_REMOVED',
            rjvId: rjvId,
            data: {
                name: name,
                namespace:
                    hidden === undefined
                        ? namespace.splice(0, namespace.length - 1)
                        : namespace,
                existing_value: src,
                variable_removed: true
            }
        });
        //set cut value to store
        dispatcher.dispatch({
            name: 'VARIABLE_COPIED',
            rjvId: rjvId
        });
    };

    addToClipboard = () => {
        const { src } = this.props;
        const container = document.createElement('textarea');
        container.innerHTML = JSON.stringify(
            this.clipboardValue(src),
            null,
            ''
        );
        document.body.appendChild(container);
        container.select();
        document.execCommand('copy');

        document.body.removeChild(container);
    };

    clipboardValue = value => {
        const type = toType(value);
        switch (type) {
            case 'function':
            case 'regexp':
                return value.toString();
            default:
                return value;
        }
    };

    render() {
        const { theme, hidden } = this.props;

        let style = Theme(theme, 'cut-from-json').style;
        let display = hidden ? 'none' : 'inline';

        return (
            <span class="cut-from-json-container" title="Cut">
                <span
                    style={{
                        ...style,
                        display: display
                    }}
                    onClick={this.handleCut}
                >
                    <Cut class="cut-icon" {...Theme(theme, 'cut-icon')} />
                </span>
            </span>
        );
    }
}

export default CutFromJson;
