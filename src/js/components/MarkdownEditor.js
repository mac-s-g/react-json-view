import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';

export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        }
    }

    handleChange = (value) => {
        const pattern = new RegExp(/\n/g);
        const formatted = value.replace(pattern, '  \n');
        this.setState({ value: formatted });
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <MDEditor value={this.state.value} onChange={this.handleChange} />
        )
    }
}
