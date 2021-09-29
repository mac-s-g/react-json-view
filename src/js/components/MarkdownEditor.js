import React from 'react';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import 'draft-js/dist/Draft.css';

const styles = [
    {label: <svg style={{width:"24px",height:"24px"}} viewBox="0 0 24 24">
        <path fill="currentColor" d="M13.5 15.5H10v-3h3.5A1.5 1.5 0 0115 14a1.5 1.5 0 01-1.5 1.5m-3.5-9h3A1.5 1.5 0 0114.5 8 1.5 1.5 0 0113 9.5h-3m5.6 1.29c.97-.68 1.65-1.79 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.1 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42z"/>
        </svg>,
        style: 'BOLD'
    },
    {
        label: <svg style={{width:"24px",height:"24px"}} viewBox="0 0 24 24">
            <path fill="currentColor" d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"/>
        </svg>,
        style: 'ITALIC'
    },
    {label: <svg style={{width:"24px",height:"24px"}} viewBox="0 0 24 24">
        <path fill="currentColor" d="M5 21h14v-2H5v2m7-4a6 6 0 006-6V3h-2.5v8a3.5 3.5 0 01-3.5 3.5A3.5 3.5 0 018.5 11V3H6v8a6 6 0 006 6z"/>
        </svg>, 
        style: 'UNDERLINE'
    }
];

const headings = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
];

const blockTypes = [
    {
        label: <svg style={{width:"24px",height:"24px"}}viewBox="0 0 24 24">
        <path fill="currentColor" d="M7 5h14v2H7V5m0 8v-2h14v2H7M4 4.5A1.5 1.5 0 015.5 6 1.5 1.5 0 014 7.5 1.5 1.5 0 012.5 6 1.5 1.5 0 014 4.5m0 6A1.5 1.5 0 015.5 12 1.5 1.5 0 014 13.5 1.5 1.5 0 012.5 12 1.5 1.5 0 014 10.5M7 19v-2h14v2H7m-3-2.5A1.5 1.5 0 015.5 18 1.5 1.5 0 014 19.5 1.5 1.5 0 012.5 18 1.5 1.5 0 014 16.5z"/>
        </svg>, 
        style: 'unordered-list-item'},
    {
        label: <svg style={{width:"24px",height:"24px"}} viewBox="0 0 24 24">
            <path fill="currentColor" d="M7 13v-2h14v2H7m0 6v-2h14v2H7M7 7V5h14v2H7M3 8V5H2V4h2v4H3m-1 9v-1h3v4H2v-1h2v-.5H3v-1h1V17H2m2.25-7a.75.75 0 01.75.75c0 .2-.08.39-.21.52L3.12 13H5v1H2v-.92L4 11H2v-1h2.25z"/>
        </svg>,
        style: 'ordered-list-item'
    },
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
        return (
            <div className="md-editor-container">
                <div class="styles">
                    {styles.map(type => (
                        <StyleButton
                            style={type.style}
                            onToggle={this.handleStyleToggle}
                            active={this.state.value.getCurrentInlineStyle().has(type.style)}
                        >
                            {type.label}
                        </StyleButton>
                    ))}
                    {blockTypes.map(type => (
                        <StyleButton
                            style={type.style}
                            onToggle={this.handleBlockTypeToggle}
                        >
                            {type.label}
                        </StyleButton>
                    ))}
                    <Headers onToggle={this.handleBlockTypeToggle} />
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

const Headers = ({ onToggle }) => {
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <div className="md-headers">
            <button onClick={() => setMenuOpen(value => !value)}>Headers</button>
            {
                menuOpen
                    ? <div className="header-buttons-container">
                        {headings.map(type => (
                            <StyleButton
                                style={type.style}
                                onToggle={onToggle}
                            >
                                {type.label}
                            </StyleButton>
                        ))}
                    </div>
                    : null
            }
        </div>
    );
};

const StyleButton = ({ children, style, onToggle, active }) => {
    const _onToggle = (e) => {
        e.preventDefault();
        onToggle(style);
    };
    const styles = {
        background: active ? '#ddd' : 'transparent',
    };

    return (
        <span className="style-button" onMouseDown={_onToggle} style={styles}>{children}</span>
    );
};
