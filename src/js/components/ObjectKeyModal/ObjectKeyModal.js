import React from 'react';
import dispatcher from './../../helpers/dispatcher';
import AutosizeTextarea from 'react-textarea-autosize';

import { Add as Cancel, CheckCircle } from './../icons';

//global theme
import Theme from './../../themes/getStyle';
import Draggable from 'react-draggable';

//this input appears when adding a new value to an object or doing external paste
export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            input: props.input ? props.input : '',
            pasteInput: ''
        };
    }

    componentDidMount() {
        document.body.addEventListener('mousedown', this.handleMouseDown);
    }

    componentWillUnmount() {
        document.body.removeEventListener('mousedown', this.handleMouseDown);
    }

    handleMouseDown = event => {
        if (event.target.className === 'key-modal-request') {
            this.closeModal();
        }
    };

    render() {
        const { theme, rjvId, pasted, parent_type } = this.props;
        const parentIsNotArray = parent_type !== 'array';
        return (
            <div
                class="key-modal-request"
                {...Theme(theme, 'key-modal-request')}
            >
                <Draggable disabled={pasted} bounds="parent">
                    <div
                        {...Theme(theme, 'key-modal')}
                        class="request-modal"
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    >
                        {parentIsNotArray ? (
                            <div {...Theme(theme, 'key-modal-label')}>
                                Key Name
                            </div>
                        ) : null}
                        <div style={{ position: 'relative' }}>
                            {parent_type !== 'array'
                                ? this.renderKeyNameInput()
                                : null}
                            {pasted ? this.renderPasteInput() : null}
                        </div>
                        <span {...Theme(theme, 'key-modal-cancel')}>
                            <Cancel
                                {...Theme(theme, 'key-modal-cancel-icon')}
                                class="key-modal-cancel"
                                title="Cancel"
                                onClick={() => {
                                    dispatcher.dispatch({
                                        rjvId: rjvId,
                                        name: 'RESET'
                                    });
                                }}
                            />
                        </span>
                    </div>
                </Draggable>
            </div>
        );
    }

    renderKeyNameInput = () => {
        const { theme, isValidKeyName, pasted } = this.props;
        const { input } = this.state;
        const hasValidKeyName = isValidKeyName(input);

        return (
            <div>
                <input
                    {...Theme(theme, 'key-modal-input')}
                    class="key-modal-input"
                    autoFocus={true}
                    spellCheck={false}
                    value={input}
                    onChange={e => {
                        this.setState({
                            input: e.target.value
                        });
                    }}
                    onKeyPress={e => {
                        if (hasValidKeyName && e.key === 'Enter' && !pasted) {
                            this.submit();
                            this.closeModal();
                        } else if (e.key === 'Escape') {
                            this.closeModal();
                        }
                    }}
                />
                {hasValidKeyName && !pasted ? (
                    <CheckCircle
                        {...Theme(theme, 'key-modal-submit')}
                        class="key-modal-submit"
                        title="Submit"
                        onClick={this.submit}
                    />
                ) : null}
            </div>
        );
    };

    handlePasteInputChange = e => {
        this.setState({
            pasteInput: e.target.value
        });
    };

    handlePasteInputKeyPress = (e, showSubmitButton) => {
        switch (e.key) {
            case 'Enter': {
                if (showSubmitButton && e.ctrlKey) {
                    this.submit();
                    this.closeModal();
                }
                break;
            }
            case 'Escape': {
                this.closeModal();
                break;
            }
        }
    };

    renderPasteInput = () => {
        const {
            theme,
            isValidKeyName,
            parent_type,
            parsePasteInput
        } = this.props;
        const { pasteInput, input } = this.state;
        const isPasteValueNotEmpty = pasteInput !== '';
        const parentIsArray = parent_type === 'array';
        const hasValidKeyName = isValidKeyName(input);
        let errorMessage = '';
        let showSubmitButton =
            (hasValidKeyName || parentIsArray) && isPasteValueNotEmpty;
        const parsedPasteInput = parsePasteInput(pasteInput);
        if (parsedPasteInput['__proto__']['name'] === 'SyntaxError') {
            errorMessage = parsedPasteInput['message'];
            showSubmitButton = false;
        }
        return (
            <div>
                <div {...Theme(theme, 'key-modal-label')}>Paste value here</div>
                <AutosizeTextarea
                    {...Theme(theme, 'value-modal-textarea')}
                    class="value-modal-textarea"
                    value={pasteInput}
                    minRows={2}
                    autoFocus={parentIsArray}
                    onChange={this.handlePasteInputChange}
                    onKeyDown={e =>
                        this.handlePasteInputKeyPress(e, showSubmitButton)
                    }
                />
                {showSubmitButton ? this.renderPasteValueSubmitButton() : null}
                {errorMessage ? (
                    <div {...Theme(theme, 'paste-value-error-message')}>
                        {errorMessage}
                    </div>
                ) : null}
            </div>
        );
    };

    renderPasteValueSubmitButton = () => {
        const { parent_type, theme } = this.props;
        const componentName =
            parent_type === 'array'
                ? 'value-modal-submit-in-array'
                : 'value-modal-submit';
        return (
            <CheckCircle
                {...Theme(theme, componentName)}
                class="value-modal-submit"
                title="Submit"
                onClick={e => {
                    this.submit();
                    this.closeModal();
                }}
            />
        );
    };

    closeModal = () => {
        dispatcher.dispatch({
            rjvId: this.props.rjvId,
            name: 'RESET'
        });
    };

    submit = () => {
        if (this.props.pasted) {
            this.props.submit(this.state.input, this.state.pasteInput);
        } else {
            this.props.submit(this.state.input);
        }
    };
}
