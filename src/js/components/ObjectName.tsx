import React from 'react';
import Theme from '../themes/getStyle';

export default function ObjectName({
    parent_type,
    namespace,
    quotesOnKeys,
    theme,
    jsvRoot,
    name,
    displayArrayKey
}) {
    const display_name = name ? name : '';

    if (jsvRoot && (name === false || name === null)) {
        return <span />;
    }

    if (parent_type == 'array') {
        return displayArrayKey ? (
            <span {...Theme(theme, 'array-key')} key={namespace}>
                <span className="array-key">{display_name}</span>
                <span {...Theme(theme, 'colon')}>:</span>
            </span>
        ) : (
            <span />
        );
    }

    return (
        <span {...Theme(theme, 'object-name')} key={namespace}>
            <span className="object-key">
                {quotesOnKeys && (
                    <span style={{ verticalAlign: 'top' }}>"</span>
                )}
                <span>{display_name}</span>
                {quotesOnKeys && (
                    <span style={{ verticalAlign: 'top' }}>"</span>
                )}
            </span>
            <span {...Theme(theme, 'colon')}>:</span>
        </span>
    );
}
