import React from 'react';

import { toType } from './../helpers/util';

//clibboard icon
import { Clippy } from './icons';

//theme
import Theme from './../themes/getStyle';
import ObjectAttributes from '../stores/ObjectAttributes';
import dispatcher from '../helpers/dispatcher';

export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };
    }

    copiedTimer = null;

    componentWillUnmount() {
        if (this.copiedTimer) {
            clearTimeout(this.copiedTimer);
            this.copiedTimer = null;
        }
    }

    handleCopy = () => {
        const container = document.createElement('textarea');
        const { clickCallback, src, namespace, rjvId } = this.props;
        ObjectAttributes.set(rjvId,  'global', 'copied', src);

        container.innerHTML = JSON.stringify(
            this.clipboardValue(src),
            null,
            '  '
        );

        document.body.appendChild(container);
        container.select();
        document.execCommand('copy');

        document.body.removeChild(container);

        dispatcher.dispatch({
            name: 'VARIABLE_COPIED',
            rjvId: rjvId,
        });
    }

    getClippyIcon = () => {
        const { theme } = this.props;

        return <Clippy class="copy-icon" {...Theme(theme, 'copy-icon')} />;
    }

    clipboardValue = value => {
        const type = toType(value);
        switch (type) {
        case 'function':
        case 'regexp':
            return value.toString();
        default:
            return value;
        }
    }

    render() {
        const { theme, hidden } = this.props;
        let style = Theme(theme, 'copy-to-clipboard').style;
        let display = hidden ? 'none' : 'inline';

        return (
            <span class="copy-to-clipboard-container" title="Copy to clipboard">
                <span
                    style={{
                        ...style,
                        display: display
                    }}
                    onClick={this.handleCopy}
                >
                    {this.getClippyIcon()}
                </span>
            </span>
        );
    }
}
