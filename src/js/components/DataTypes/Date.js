import React from 'react';
import DataTypeLabel from './DataTypeLabel';
import { highlight } from './../../helpers/highlight-words-core';

//theme
import Theme from './../../themes/getStyle';

export default class extends React.PureComponent {
    render() {
        const type_name = 'date';
        const { props } = this;
        const {
            autoEscape,
            caseSensitive,
            searchWords,
            highlightStyle,
            highlightClassName
        } = props;
        const display_options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        const highlight_options = {
            autoEscape,
            caseSensitive,
            searchWords,
            highlightStyle,
            highlightClassName,
            textToHighlight: props.value.toLocaleTimeString(
                'en-us',
                display_options
            )
        };

        return (
            <div {...Theme(props.theme, 'date')}>
                <DataTypeLabel type_name={type_name} {...props} />
                <span class="date-value" {...Theme(props.theme, 'date-value')}>
                    {highlight(highlight_options)}
                </span>
            </div>
        );
    }
}
