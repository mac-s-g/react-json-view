import React from 'react';

//theme
import Theme from './../../themes/getStyle';

export class JsonNan extends React.PureComponent {
    render() {
        const { props } = this;
        return <div {...Theme(this.props.theme, 'nan')}>
            <span style={{backgroundColor: props.isCurrent ? 'orange' : props.highlight ?  'yellow' : 'inherit'}}>NaN</span>
        </div>;
    }
}
