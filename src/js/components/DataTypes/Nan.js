import React from 'react';

//theme
import Theme from './../../themes/getStyle';

export class JsonNan extends React.PureComponent {
    render() {
        return <div {...Theme(this.props.theme, 'nan')}>NaN</div>;
    }
}
