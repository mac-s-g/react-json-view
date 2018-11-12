import React from 'react';
import dispatcher from './../../helpers/dispatcher';
import ObjectAttributes from './../../stores/ObjectAttributes';
import ObjectKeyModal from './ObjectKeyModal';

//global theme
import Theme from './../../themes/getStyle';


//this input appears when adding a new value to an object
export default class extends React.PureComponent {

    render() {
        const {active, theme, rjvId } = this.props;
        const { name } = ObjectAttributes.get(rjvId, 'action', 'edit-key-request') || {};

        return active ? (
            <ObjectKeyModal
                rjvId={rjvId}
                theme={theme}
                input={name}
                isValid={this.isValid}
                submit={this.submit}
            />
        ) : null;
    }

    isValid = (input) => {
        const {rjvId} = this.props;
        const request = ObjectAttributes.get(
            rjvId, 'action', 'edit-key-request'
        );
        return (
            input != ''
        );
    }

    submit = (input) => {
        const { rjvId } = this.props;
        let request = ObjectAttributes.get(
            rjvId, 'action', 'edit-key-request'
        );     
        request.key_name = input;
        request.new_value = request.existing_value;
        request.variable_key_updated = true;
        dispatcher.dispatch({
            name: 'VARIABLE_KEY_UPDATED',
            rjvId: rjvId,
            data: request
        });
    }
}
