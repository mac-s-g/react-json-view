import React from 'react';
import dispatcher from './../../helpers/dispatcher';

import {CheckCircle, Add as Cancel} from './../icons';

//global theme
import Theme from './../../themes/getStyle';


//this input appears when adding a new value to an object
export default class extends React.Component {

    state = {
        input: ''
    }

    render() {
        const {theme, rjvId, isValid} = this.props;
        const {input} = this.state;

        const valid = isValid(input);

        return (
        <div
        class="key-modal-request"
        {...Theme(theme, 'key-modal-request')}
        onClick={()=>{
            dispatcher.dispatch({
                rjvId: rjvId,
                name: 'RESET'
            });
            this.state.input = '';
        }}
        >
            <div {...Theme(theme, 'key-modal')}
            onClick={(e)=>{e.stopPropagation();}}>
                <div {...Theme(theme, 'key-modal-label')}>
                    Key Name:
                </div>
                <div style={{position: 'relative'}}>
                    <input {...Theme(theme, 'key-modal-input')}
                        class="key-modal-input"
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
                        ? <CheckCircle {...Theme(theme, 'key-modal-submit')}
                            class="key-modal-submit"
                            onClick={e => this.submit()}
                        />
                        : null}
                </div>
                <span {...Theme(theme, 'key-modal-cancel')}>
                    <Cancel {...Theme(theme, 'key-modal-cancel-icon')}
                    class="key-modal-cancel"
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
        );
    }

    submit = () => {
        this.props.submit(this.state.input);
        this.state.input = '';
    }

}
