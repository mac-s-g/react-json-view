import React from 'react';

//theme
import style from './../../themes/getStyle';

export default class extends React.Component {

    render() {
        const type_name = 'null';
        return (
        <div {...style(this.props.theme, 'null')}>
            NULL
        </div>
        );
    }

}