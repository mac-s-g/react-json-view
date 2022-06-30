import React from 'react';
import DataTypeLabel from './DataTypeLabel';
import { highlight } from './../../helpers/highlight-words-core';

//theme
import Theme from './../../themes/getStyle';

export default class extends React.PureComponent {
    render() {
        const type_name = 'float';
        const { props } = this;
        const {
            value,
            autoEscape,
            caseSensitive,
            searchWords,
            highlightStyle,
            highlightClassName
        } = props;

        const options = {
            autoEscape,
            caseSensitive,
            searchWords,
            highlightStyle,
            highlightClassName,
            textToHighlight: value
        };

        return (
            <div {...Theme(props.theme, 'float')}>
                <DataTypeLabel type_name={type_name} {...props} />
                {highlight(options)}
            </div>
        );
    }
}
