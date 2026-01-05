import React from 'react';

import { toType } from './../helpers/util';

//theme
import Theme from './../themes/getStyle';

export default class extends React.PureComponent {
    handleClick = () => {
        const { customButtonProps, src, namespace } = this.props;
        const { onClick } = customButtonProps;
        const valueFromSrc = this.clipboardValue(src);

        onClick({ value: valueFromSrc, namespace });
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
        const { theme, hidden, customButtonProps, rowHovered } = this.props;
        let style = Theme(theme, 'copy-to-clipboard').style;
        let display = 'inline';

        const { icon, title, forceShow } = customButtonProps;

        if (hidden) {
            display = 'none';
        }
        let containerDisplay = 'inline-block';
        if (forceShow) {
            containerDisplay = 'inline-block';
        } else if (!rowHovered) {
            containerDisplay = 'none';
        }

        return (
            <span
                className="copy-to-clipboard-container"
                title={title || 'Apply filter'}
                style={{
                    verticalAlign: 'top',
                    display: containerDisplay
                }}
            >
                <span
                    style={{
                        ...style,
                        display: display
                    }}
                    onClick={e => {
                        e.stopPropagation();
                        this.handleClick();
                    }}
                >
                    {icon}
                </span>
            </span>
        );
    }
}
