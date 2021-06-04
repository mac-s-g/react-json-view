import React from 'react';

//theme
import Theme from './../../themes/getStyle';

export class JsonNull extends React.PureComponent {
    render() {
        return <div {...Theme(this.props.theme, 'null')}>NULL</div>;
    }
}
