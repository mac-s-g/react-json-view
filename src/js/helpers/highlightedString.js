import React from 'react';

import Theme from './../themes/getStyle';

export default (value, start, length, theme) => {
    const before = value.substr(0, start);
    const highlighted = value.substr(start, length);
    const after = value.substr(start + length);
    return (
        <span>
            {before}
            <span {...Theme(theme, 'highlighted')}>{highlighted}</span>
            {after}
        </span>
    );
};
