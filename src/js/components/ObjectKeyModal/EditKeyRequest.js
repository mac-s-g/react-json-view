import React from 'react';
import dispatcher from './../../helpers/dispatcher';
import ObjectAttributes from './../../stores/ObjectAttributes';
import ObjectKeyModal from './ObjectKeyModal';

//this input appears when adding a new value to an object
export default class extends React.PureComponent {

    render() {
        const {active, theme, rjvId } = this.props;
        const { key_name } = ObjectAttributes.get(rjvId, 'action', 'edit-key-request') || {};

        return active &&
            <ObjectKeyModal
                rjvId={rjvId}
                theme={theme}
                input={key_name}
                isValid={this.isValid}
                submit={this.submit}
            />;
    }

    isValid = (input) => {
        const {rjvId} = this.props;
        const request = ObjectAttributes.get(
            rjvId, 'action', 'edit-key-request'
        );
        return (
            input !== ''
            && Object.keys(request.existing_value).indexOf(input) === -1
        );
    }

    submit = (input) => {
        const { rjvId } = this.props;
        let request = ObjectAttributes.get(
            rjvId, 'action', 'edit-key-request'
        );
        let {
            key_name,
            existing_value,
        } = request;
        let newSrc = {};
        let dropIndex = Object.keys(existing_value).findIndex(key => key === key_name);

        Object.keys(existing_value).forEach((key, idx) => {
            if (idx !== dropIndex) {
                newSrc[key] = existing_value[key];
            } else {
                newSrc[input] = existing_value[key];
            }
        });

        dispatcher.dispatch({
            name: 'VARIABLE_KEY_UPDATED',
            rjvId: rjvId,
            data: {
                ...request,
                new_value: newSrc
            }
        });
    }
}