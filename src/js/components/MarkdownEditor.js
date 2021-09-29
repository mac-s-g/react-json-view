import React from 'react';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import 'draft-js/dist/Draft.css';

const styles = [
    {label: 'B', style: 'BOLD'},
    {label: 'I', style: 'ITALIC'},
    {label: 'U', style: 'UNDERLINE'}
];

export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: EditorState.createWithContent(convertFromRaw(markdownToDraft(props.value))),
        }
    }

    componentDidMount() {
        if (this.editor) {
            this.editor.focus();
        }
    }

    handleStyleToggle = (style) => {
        this.handleChange(RichUtils.toggleInlineStyle(this.state.value, style));
    }

    handleChange = (value) => {
        this.setState({ value });
        if (this.props.onChange) {
            const plainText = draftToMarkdown(convertToRaw(value.getCurrentContent()));
            this.props.onChange(plainText);
        }
    }

    render() {
        return (
            <div>
                {styles.map(type => (
                    <StyleButton
                        label={type.label}
                        style={type.style}
                        onToggle={this.handleStyleToggle}
                        active={this.state.value.getCurrentInlineStyle().has(type.style)}
                    />
                ))}
                <Editor
                    ref={el => this.editor = el}
                    editorState={this.state.value}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

const StyleButton = ({ label, style, onToggle, active }) => {
    const _onToggle = (e) => {
        e.preventDefault();
        onToggle(style);
    };
    const styles = {
        fontWeight: active ? 'bold' : 'normal',
    };

    return (
        <span onMouseDown={_onToggle} style={styles}>{label}</span>
    );
};
