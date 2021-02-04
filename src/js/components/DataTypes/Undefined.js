import React from 'react';

//theme
import Theme from './../../themes/getStyle';

export default class extends React.PureComponent {
    render() {
        return <div {...Theme(this.props.theme, 'undefined')}>undefined</div>;
    }
}
