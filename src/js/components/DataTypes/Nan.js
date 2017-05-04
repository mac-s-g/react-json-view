import React from 'react';

//theme
import Theme from './../../themes/getStyle';

export default class extends React.Component {

    render() {
        const type_name = 'nan';
        return (
        <div {...Theme(this.props.theme, 'nan')}>
            NaN
        </div>
        );
    }

}