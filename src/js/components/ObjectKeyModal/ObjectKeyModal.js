import React from 'react';
import dispatcher from './../../helpers/dispatcher';

import {CheckCircle, Add as Cancel} from './../icons';

//global theme
import Theme from './../../themes/getStyle';


//this input appears when adding a new value to an object
export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            input: props.input ? props.input : '',
            pasteInput: props.pasteInput ? props.pasteInput : '',
            keyModalRef: ''
        };
    }

    changeKeyModalRef = (ref) => {
        if (ref) {
            this.setState({
                keyModalRef: ref
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.keyModalRef !== prevState.keyModalRef) {
            this.state.keyModalRef.focus();
        }
    }

    render() {
        const {theme, rjvId, pasted, parent_type} = this.props;
        const parentIsNotArray = parent_type !== 'array';
        return (
            <div
                class="key-modal-request"
                {...Theme(theme, 'key-modal-request')}
                onClick={this.closeModal}
            >
                <div
                    {...Theme(theme, 'key-modal')}
                    onClick={(e)=>{e.stopPropagation();}}
                >
                    { parentIsNotArray ?
                        <div {...Theme(theme, 'key-modal-label')}>
                            Key Name:
                        </div>
                        : null
                    }
                    <div style={{position: 'relative'}}>
                        { parent_type !== 'array' ? this.renderKeyNameInput() : null }
                        { pasted ? this.renderPasteInput() : null }
                    </div>
                    <span {...Theme(theme, 'key-modal-cancel')}>
                        <Cancel {...Theme(theme, 'key-modal-cancel-icon')}
                            class="key-modal-cancel"
                            title="Cancel"
                            onClick={()=>{
                                dispatcher.dispatch({
                                    rjvId: rjvId,
                                    name: 'RESET'
                                });
                            }} />
                    </span>
                </div>
            </div>
        );
    }

    renderKeyNameInput = () => {
        const { theme, isValid, pasted } = this.props;
        const {input} = this.state;
        const valid = isValid(input);

        return (
            <div>
                <input {...Theme(theme, 'key-modal-input')}
                    className="key-modal-input"
                    ref={this.changeKeyModalRef}
                    spellCheck={false}
                    value={input}
                    placeholder="..."
                    onChange={(e) => {
                        this.setState({
                            input: e.target.value
                        });
                    }}
                    onKeyPress={(e) => {
                        if (valid && e.key === 'Enter') {
                            this.submit();
                        } else if (e.key === 'Escape') {
                            this.closeModal();
                        }
                    }}
                />
                { valid && !pasted
                    ? <CheckCircle {...Theme(theme, 'key-modal-submit')}
                        class="key-modal-submit"
                        title="Submit"
                        onClick={e => this.submit()}
                    />
                    : null }
            </div>
        );
    }

    renderPasteInput = () => {
        const { theme, isValid } = this.props;
        const { pasteInput, input } = this.state;
        const isPasteValueNotEmpty = pasteInput !== '';
        const valid = isValid(input);
        return (
            <div>
                <div {...Theme(theme, 'key-modal-label')}>
                    Value:
                </div>
                <input {...Theme(theme, 'value-modal-input')}
                    className="value-modal-input"
                    spellCheck={false}
                    value={pasteInput}
                    placeholder="..."
                    onChange={(e) => {
                        this.setState({
                            pasteInput: e.target.value
                        });
                    }}
                    onKeyPress={(e) => {
                        if (valid && isPasteValueNotEmpty && e.key === 'Enter') {
                            this.submit();
                            this.closeModal();
                        } else if (e.key === 'Escape') {
                            this.closeModal();
                        }
                    }}
                />
                { valid && isPasteValueNotEmpty ?
                    <CheckCircle {...Theme(theme, 'value-modal-submit')}
                        class="value-modal-submit"
                        title="Submit"
                        onClick={e => {
                            this.submit();
                            this.closeModal();
                        }}
                    />
                    : null
                }
            </div>
        );
    }

    closeModal = () => {
        dispatcher.dispatch({
            rjvId: this.props.rjvId,
            name: 'RESET'
        });
    }

    submit = () => {
        if (this.props.pasted) {
            this.props.submit(this.state.input, this.state.pasteInput);
        } else {
            this.props.submit(this.state.input);
        }
    }
}
