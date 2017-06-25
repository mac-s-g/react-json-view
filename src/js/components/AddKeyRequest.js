import React from 'react';
import dispatcher from './../helpers/dispatcher';
import ObjectAttributes from './../stores/ObjectAttributes';

import Cancel from 'react-icons/lib/md/add';
import Add from 'react-icons/lib/fa/check-circle';

//global theme
import Theme from './../themes/getStyle';


//this input appears when adding a new value to an object
export default class extends React.Component {

    state = {
        input: ''
    }

    render() {
        const {active, theme, rjvId} = this.props;
        const {input} = this.state;
        const valid = this.isValid(rjvId, input);

        return active ? (
        <div
        class="add-key-request"
        {...Theme(theme, 'add-key-request')}
        onClick={()=>{
            dispatcher.dispatch({
                rjvId: rjvId,
                name: 'RESET'
            });
            this.state.input = '';
        }}
        >
            <div {...Theme(theme, 'add-key-modal')}
            onClick={(e)=>{e.stopPropagation();}}>
                <div {...Theme(theme, 'add-key-label')}>Key Name:</div>
                <div style={{position: 'relative'}}>
                    <input {...Theme(theme, 'add-key-input')}
                        class="add-key-input"
                        ref={input => input && input.focus()}
                        spellCheck={false}
                        value={input}
                        placeholder="..."
                        onChange={(e)=>{
                            this.setState({
                                input: e.target.value
                            })
                        }}
                        onKeyPress={(e)=>{
                            if (valid && e.key === 'Enter') {
                                this.submit();
                            }
                        }}
                    />
                    {valid
                        ? <Add {...Theme(theme, 'add-key-submit')}
                            class="add-key-submit"
                            onClick={e => this.submit()}
                        />
                        : null}
                </div>
                <span {...Theme(theme, 'add-key-cancel')}>
                    <Cancel {...Theme(theme, 'add-key-cancel-icon')}
                    class="add-key-cancel"
                    onClick={()=>{
                        dispatcher.dispatch({
                            rjvId: rjvId,
                            name: 'RESET'
                        });
                        this.state.input = '';
                    }} />
                </span>
            </div>
        </div>
        ) : null;
    }


    isValid = (rjvId, input) => {
        const request = ObjectAttributes.get(
            rjvId, 'action', 'new-key-request'
        );
        return (
            input != ''
            && Object.keys(request.existing_value).indexOf(input) === -1
        );
    }

    submit = () => {
        const {input} = this.state;
        const {rjvId} = this.props;
        let request = ObjectAttributes.get(
            rjvId, 'action', 'new-key-request'
        );
        request.new_value = {...request.existing_value};
        request.new_value[input] = null;
        dispatcher.dispatch({
            name: 'VARIABLE_ADDED',
            rjvId: rjvId,
            data: {...request, key_name: input}
        });
        this.state.input = '';
    }

}
