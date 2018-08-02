import React from 'react';
import Theme from './../themes/getStyle';
import highlightedString from './../helpers/highlightedString';
import searchStringIndex from './../helpers/searchStringIndex';

export default function getObjectName(props) {
    const {
        parent_type, namespace, theme, jsvRoot, name, search
    } = props;

    let display_name = props.name ? props.name : '';

    const start = searchStringIndex(display_name, search);
    if (start > -1) {
        display_name = highlightedString(display_name, start, search.length, theme);
    }

    if (jsvRoot && (name === false || name === null)) {
        return (<span />);
    } else if (parent_type == 'array') {
        return (
            <span {...Theme(theme, 'array-key')} key={namespace}>
                <span class="array-key">{display_name}</span>
                <span {...Theme(theme, 'colon')}>:</span>
            </span>
        );
    } else {
        return (
            <span {...Theme(theme, 'object-name')} key={namespace}>
                <span class="object-key">
                    <span style={{verticalAlign:'top'}}>"</span>
                    <span>{display_name}</span>
                    <span style={{verticalAlign:'top'}}>"</span>
                </span>
                <span {...Theme(theme, 'colon')}>:</span>
            </span>
        );
    }
}
