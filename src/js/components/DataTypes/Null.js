import React from 'react';

//theme
import Theme from './../../themes/getStyle';

export class JsonNull extends React.PureComponent {
    render() {
        const { props } = this;
        return <div {...Theme(this.props.theme, 'null')}>
            <span style={{backgroundColor: props.isCurrent ? 'orange' : props.highlight ?  'yellow' : 'inherit'}}>NULL</span>
        </div>;
    }
}
