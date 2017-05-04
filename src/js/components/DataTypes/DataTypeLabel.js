import React from 'react';
import ConfigStore from './../../stores/ConfigStore';

//theme
import style from './../../themes/getStyle';

export default class extends React.Component {

    render() {
        const {rjvId, type_name, theme} = this.props;
        if (ConfigStore.get(rjvId, 'displayDataTypes', true)) {
            return (
                <span {...style(theme, 'data-type-label')}>{type_name}</span>
            );
        } else {
            return <div />
        }

    }

}