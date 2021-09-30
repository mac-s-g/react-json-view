import React from 'react';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { Bold, Italic, OrderedList, Underline, UnorderedList, H1, H2, H3, H4, H5, H6 } from './icons';
import 'draft-js/dist/Draft.css';

const styles = [
    { label: <Bold />, style: 'BOLD' },
    { label: <Italic />, style: 'ITALIC' },
    { label: <Underline />, style: 'UNDERLINE' },
];

const blockTypes = [
    { label: <UnorderedList />, style: 'unordered-list-item' },
    { label: <OrderedList />, style: 'ordered-list-item' },
    { label: <H1 />, style: 'header-one' },
    { label: <H2 />, style: 'header-two' },
    { label: <H3 />, style: 'header-three'},
    { label: <H4 />, style: 'header-four' },
    { label: <H5 />, style: 'header-five' },
    { label: <H6 />, style: 'header-six' },
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

    handleBlockTypeToggle = (style) => {
        this.handleChange(RichUtils.toggleBlockType(this.state.value, style));
    }

    handleChange = (value) => {
        this.setState({ value });
        if (this.props.onChange) {
            const plainText = draftToMarkdown(convertToRaw(value.getCurrentContent()));
            this.props.onChange(plainText);
        }
    }

    render() {
        const { value } = this.state;
        const currentBlockType = value.getCurrentContent().getBlockForKey(value.getSelection().getStartKey()).getType();

        return (
            <div className="md-editor-container">
                <div class="styles">
                    {styles.map(type => (
                        <StyleButton
                            style={type.style}
                            onToggle={this.handleStyleToggle}
                            active={value.getCurrentInlineStyle().has(type.style)}
                        >
                            {type.label}
                        </StyleButton>
                    ))}
                    {blockTypes.map(type => (
                        <StyleButton
                            style={type.style}
                            onToggle={this.handleBlockTypeToggle}
                            active={currentBlockType === type.style}
                        >
                            {type.label}
                        </StyleButton>
                    ))}
                </div>
                <div className="md-editor">
                    <Editor
                        ref={el => this.editor = el}
                        editorState={this.state.value}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }
}

const StyleButton = ({ children, style, onToggle, active }) => {
    const _onToggle = (e) => {
        e.preventDefault();
        onToggle(style);
    };
    const classNames = {
        s: 'style-button',
        a: active ? 'active' : null
    };

    return (
        <span className={Object.values(classNames).filter(Boolean).join(' ')} onMouseDown={_onToggle}>
            {children}
        </span>
    );
};
