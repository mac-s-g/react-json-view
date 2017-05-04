import React from 'react';

//theme
import style from './../../themes/getStyle';

export default class extends React.Component {

    render() {
        const type_name = 'nan';
        return (
        <div {...style(this.props.theme, 'nan')}>
            NaN
        </div>
        );
    }

}