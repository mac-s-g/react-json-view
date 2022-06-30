import React from 'react';
import { highlight } from './../../helpers/highlight-words-core';
//theme
import Theme from './../../themes/getStyle';

export default class extends React.PureComponent {
    render() {
        const {
            autoEscape,
            caseSensitive,
            searchWords,
            highlightStyle,
            highlightClassName
        } = this.props;

        const options = {
            autoEscape,
            caseSensitive,
            searchWords,
            highlightStyle,
            highlightClassName,
            textToHighlight: 'NaN'
        };

        return (
            <div {...Theme(this.props.theme, 'nan')}>{highlight(options)}</div>
        );
    }
}
