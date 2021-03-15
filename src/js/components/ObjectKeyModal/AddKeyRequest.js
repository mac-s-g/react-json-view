import React from 'react';
import dispatcher from './../../helpers/dispatcher';
import ObjectAttributes from './../../stores/ObjectAttributes';
import ObjectKeyModal from './ObjectKeyModal';
import {insertToObject} from '../../helpers/util';

//this input appears when adding a new value to an object or copy/cut pasting something into object
export default class extends React.PureComponent {

    render() {
        const {active, theme, rjvId} = this.props;

        return active ? (
            <ObjectKeyModal
                rjvId={rjvId}
                theme={theme}
                isValid={this.isValid}
                submit={this.submit}
            />
        ) : null;
    }

    isValid = (input) => {
        const {rjvId} = this.props;
        const request = ObjectAttributes.get(
            rjvId, 'action', 'new-key-request'
        );
        return (
            input != ''
            && Object.keys(request.existing_value).indexOf(input) === -1
        );
    }

    submit = (input) => {
        const {rjvId} = this.props;
        let request = ObjectAttributes.get(
            rjvId, 'action', 'new-key-request'
        );
        const { existing_value, dropTargetIdx, pasteValue } = request;

        if (request.pasted) {
            const newSrc = insertToObject({existing_value, dropTargetIdx, input, pasteValue});
            dispatcher.dispatch({
                name: 'VARIABLE_ADDED',
                rjvId: rjvId,
                data: {
                    ...request,
                    new_value: newSrc
                }
            });
        }
        else {
            request.new_value = {[input]: this.props.defaultValue, ...request.existing_value};
            dispatcher.dispatch({
                name: 'VARIABLE_ADDED',
                rjvId: rjvId,
                data: request
            });
        }

    }

}
