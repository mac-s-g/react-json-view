import React from 'react';
import Theme from './../themes/getStyle';

export default function getObjectName(props) {
    const {
        parent_type,
        namespace,
        quotesOnKeys,
        theme,
        jsvRoot,
        name,
        displayArrayKey,
        onSelect
    } = props;

    const display_name = props.name ? props.name : '';

    if (jsvRoot && (name === false || name === null)) {
        return <span />;
    } else if (parent_type == 'array') {
        return displayArrayKey ? (
            <span {...Theme(theme, 'array-key')} key={namespace}>
                <span class="array-key">{display_name}</span>
                <span {...Theme(theme, 'colon')}>:</span>
            </span>
        ) : (
            <span />
        );
    } else {
        return (
            <span {...Theme(theme, 'object-name')} key={namespace}>
                <span
                    onClick={
                        onSelect === false
                            ? null
                            : e => {
                                  let location = [...namespace];
                                  location.shift();
                                  onSelect({
                                      isKey: true,
                                      key: display_name,
                                      namespace: location
                                  });
                              }
                    }
                    class="object-key">
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
}
