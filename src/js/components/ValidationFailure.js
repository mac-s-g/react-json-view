import React from 'react';
import dispatcher from './../helpers/dispatcher';
import ObjectAttributes from './../stores/ObjectAttributes';

import { Add as Clear } from './icons';

//global theme
import Theme from './../themes/getStyle';

//this input appears when adding a new value to an object
export default class extends React.PureComponent {
    render() {
        const { message, active, theme, rjvId } = this.props;

        return active ? (
            <div
                class="validation-failure"
                {...Theme(theme, 'validation-failure')}
                onClick={() => {
                    dispatcher.dispatch({
                        rjvId: rjvId,
                        name: 'RESET'
                    });
                }}
            >
                <span {...Theme(theme, 'validation-failure-label')}>
                    {message}
                </span>
                <Clear {...Theme(theme, 'validation-failure-clear')} />
            </div>
        ) : null;
    }
}
