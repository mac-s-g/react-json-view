import React from 'react';

//theme
import Theme from './../../themes/getStyle';

export class JsonUndefined extends React.PureComponent {
    render() {
        const { props } = this;
        return <div {...Theme(this.props.theme, 'undefined')}>
            <span style={{backgroundColor: props.isCurrent ? 'orange' : props.highlight ?  'yellow' : 'inherit'}}>
                undefined
            </span>
        </div>;
    }
}
