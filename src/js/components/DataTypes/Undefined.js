import React from 'react';

//theme
import Theme from './../../themes/getStyle';

export class JsonUndefined extends React.PureComponent {
    render() {
        return <div {...Theme(this.props.theme, 'undefined')}>undefined</div>;
    }
}
