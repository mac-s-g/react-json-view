import React from "react";

import Theme from '../../themes/getStyle';

export const CollapsedArray = props => {

    const { theme, start, end, onClick } = props;

    return <span
        {...Theme(theme, 'brace')}
        onClick={onClick}
        class="array-group-brace"
    >
        [
        <div
            {...Theme(
                theme,
                'array-group-meta-data'
            )}
            class="array-group-meta-data"
        >
            <span
                class="object-size"
                {...Theme(theme, 'object-size')}
            >
                {start}
                {' - '}
                {end}
            </span>
        </div>
        ]
    </span>
}