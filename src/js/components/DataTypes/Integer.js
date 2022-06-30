import React from 'react';
import DataTypeLabel from './DataTypeLabel';
import { highlight } from './../../helpers/highlight-words-core';

//theme
import Theme from './../../themes/getStyle';

export default class extends React.PureComponent {
    render() {
        const type_name = 'int';
        const { props } = this;
        const {
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
            textToHighlight: `${this.props.value}`
        };

        return (
            <div {...Theme(props.theme, 'integer')}>
                <DataTypeLabel type_name={type_name} {...props} />
                {highlight(options)}
            </div>
        );
    }
}
