import React from "react"
import ReactSelect from "react-select"
import ReactJson from "./../../../../src/js/index"
import GitHubButton from "react-github-button"

import Code from "./../helpers/Code"
import "./../../style/scss/rjv-demo.scss"
import "react-select/dist/react-select.css"
import "react-github-button/assets/style.css"

//index entrypoint component
export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            src: this.getExampleJson()
        };
    }

    static defaultProps = {
        theme: "monokai",
        src: null,
        collapsed: false,
        collapseStringsAfter: 15,
        onAdd: true,
        onEdit: true,
        onDelete: true,
        displayObjectSize: true,
        enableClipboard: true,
        indentWidth: 4,
        displayDataTypes: true,
        iconStyle: "triangle"
    }

    render() {
        const {
            collapseStringsAfter,
            onAdd,
            onEdit,
            onDelete,
            displayObjectSize,
            enableClipboard,
            theme,
            iconStyle,
            collapsed,
            indentWidth,
            displayDataTypes
        } = this.props;
        const { src } = this.state;
        const style = {
            padding: "10px",
            borderRadius: "3px",
            margin: "10px 0px"
        }

        return (
            <div class="rjv-demo">
                <div class="rjv-header">
                    <div class="header-1">react-json-view</div>
                    <div class="header-2">component demo</div>
                    <img
                        class="rjv-logo"
                        src="https://github.com/mac-s-g/react-json-view/blob/master/doc/rjv-icon-alt.png?raw=true"
                        onClick={() => {
                            window.open(
                                "https://github.com/mac-s-g/react-json-view",
                                "_blank"
                            )
                        }}
                    />
                    <GitHubButton
                        type="stargazers"
                        namespace="mac-s-g"
                        repo="react-json-view"
                    />
                </div>
                <ReactJson
                    name={false}
                    collapsed={collapsed}
                    style={style}
                    theme={theme}
                    src={src}
                    collapseStringsAfterLength={collapseStringsAfter}
                    onEdit={
                        onEdit
                            ? e => {
                                  console.log(e)
                                  this.setState({ src: e.updated_src })
                              }
                            : false
                    }
                    onDelete={
                        onDelete
                            ? e => {
                                  console.log(e)
                                  this.setState({ src: e.updated_src })
                              }
                            : false
                    }
                    onAdd={
                        onAdd
                            ? e => {
                                  console.log(e)
                                  this.setState({ src: e.updated_src })
                              }
                            : false
                    }
                    displayObjectSize={displayObjectSize}
                    enableClipboard={enableClipboard}
                    indentWidth={indentWidth}
                    displayDataTypes={displayDataTypes}
                    iconStyle={iconStyle}
                />

                <div class="rjv-settings">
                    <div class="rjv-input">
                        <div class="rjv-label">Theme:</div>
                        {this.getThemeInput(theme)}
                    </div>
                    <div class="rjv-input">
                        <div class="rjv-label">Icon Style:</div>
                        {this.getIconStyleInput(iconStyle)}
                    </div>
                    <div class="rjv-input">
                        <div class="rjv-label">Enable Edit:</div>
                        {this.getEditInput(onEdit)}
                    </div>
                    <div class="rjv-input">
                        <div class="rjv-label">Enable Add:</div>
                        {this.getAddInput(onAdd)}
                    </div>
                    <div class="rjv-input">
                        <div class="rjv-label">Enable Delete:</div>
                        {this.getDeleteInput(onDelete)}
                    </div>
                    <div class="rjv-input">
                        <div class="rjv-label">Enable Clipboard:</div>
                        {this.getEnableClipboardInput(enableClipboard)}
                    </div>
                </div>

                <div class="rjv-settings">
                    <div class="rjv-input">
                        <div class="rjv-label">Display Data Types:</div>
                        {this.getDataTypesInput(displayDataTypes)}
                    </div>
                    <div class="rjv-input">
                        <div class="rjv-label">Display Object Size:</div>
                        {this.getObjectSizeInput(displayObjectSize)}
                    </div>
                    <div class="rjv-input">
                        <div class="rjv-label">Indent Width:</div>
                        {this.getIndentWidthInput(indentWidth)}
                    </div>
                    <div class="rjv-input">
                        <div class="rjv-label">Collapsed:</div>
                        {this.getCollapsedInput(collapsed)}
                    </div>
                    <div class="rjv-input">
                        <div class="rjv-label">
                            Collapse Strings After Length:
                        </div>
                        {this.getCollapsedStringsInput(collapseStringsAfter)}
                    </div>
                </div>

                {this.getNotes(onEdit, onAdd)}
            </div>
        )
    }

    getNotes = (on_edit_enabled, on_add_enabled) => {
        let notes = []
        if (on_edit_enabled) {
            notes.push(
                <span>
                    To edit a value, try <Code>ctrl/cmd + click</Code> enter edit
                    mode
                </span>
            )
            notes.push(
                <span>
                    When editing a value, try <Code>ctrl/cmd + Enter</Code> to
                    submit changes
                </span>
            )
            notes.push(
                <span>
                    When editing a value, try <Code>Escape</Code> key to cancel
                </span>
            )
        }
        if (on_add_enabled) {
            notes.push(
                <span>
                    When adding a new key, try <Code>Enter</Code> to submit
                </span>
            )
            notes.push(
                <span>
                    When adding a new key, try <Code>Escape</Code> to cancel
                </span>
            )
        }

        if (notes.length === 0) {
            return null
        }

        return (
            <div style={{ marginTop: "20px", fontStyle: "italic" }}>
                Keyboard Shortcuts
                <ul>
                    {notes.map(note => {
                        return <li>{note}</li>
                    })}
                </ul>
            </div>
        )
    }

    getIconStyleInput = iconStyle => {
        return (
            <ReactSelect
                name="icon-style"
                value={iconStyle}
                options={[
                    { value: "circle", label: "circle" },
                    { value: "square", label: "square" },
                    { value: "triangle", label: "triangle" }
                ]}
                onChange={val => {
                    this.set("iconStyle", val)
                }}
            />
        )
    }

    getEditInput = onEdit => {
        return (
            <ReactSelect
                name="enable-edit"
                value={onEdit}
                options={[
                    { value: true, label: "true" },
                    { value: false, label: "false" }
                ]}
                onChange={val => {
                    this.set("onEdit", val)
                }}
            />
        )
    }

    getAddInput = onAdd => {
        return (
            <ReactSelect
                name="enable-add"
                value={onAdd}
                options={[
                    { value: true, label: "true" },
                    { value: false, label: "false" }
                ]}
                onChange={val => {
                    this.set("onAdd", val)
                }}
            />
        )
    }

    getDeleteInput = onDelete => {
        return (
            <ReactSelect
                name="enable-delete"
                value={onDelete}
                options={[
                    { value: true, label: "true" },
                    { value: false, label: "false" }
                ]}
                onChange={val => {
                    this.set("onDelete", val)
                }}
            />
        )
    }

    getEnableClipboardInput = enableClipboard => {
        return (
            <ReactSelect
                name="enable-clipboard"
                value={enableClipboard}
                options={[
                    { value: true, label: "true" },
                    { value: false, label: "false" }
                ]}
                onChange={val => {
                    this.set("enableClipboard", val)
                }}
            />
        )
    }

    getObjectSizeInput = displayObjectSize => {
        return (
            <ReactSelect
                name="display-object-size"
                value={displayObjectSize}
                options={[
                    { value: true, label: "true" },
                    { value: false, label: "false" }
                ]}
                onChange={val => {
                    this.set("displayObjectSize", val)
                }}
            />
        )
    }

    getDataTypesInput = displayDataTypes => {
        return (
            <ReactSelect
                name="display-data-types"
                value={displayDataTypes}
                options={[
                    { value: true, label: "true" },
                    { value: false, label: "false" }
                ]}
                onChange={val => {
                    this.set("displayDataTypes", val)
                }}
            />
        )
    }

    getCollapsedStringsInput = collapseStringsAfter => {
        return (
            <ReactSelect
                name="collapse-strings"
                value={collapseStringsAfter}
                options={[
                    { value: false, label: "false" },
                    { value: 5, label: 5 },
                    { value: 10, label: 10 },
                    { value: 15, label: 15 },
                    { value: 20, label: 20 }
                ]}
                onChange={val => {
                    this.set("collapseStringsAfter", val)
                }}
            />
        )
    }

    getCollapsedInput = collapsed => {
        return (
            <ReactSelect
                name="collapsed"
                value={collapsed}
                options={[
                    { value: true, label: "true" },
                    { value: false, label: "false" },
                    { value: 1, label: 1 },
                    { value: 2, label: 2 }
                ]}
                onChange={val => {
                    this.set("collapsed", val)
                }}
            />
        )
    }

    getIndentWidthInput = indentWidth => {
        return (
            <ReactSelect
                name="indent-width"
                value={indentWidth}
                options={[
                    { value: 0, label: 0 },
                    { value: 1, label: 1 },
                    { value: 2, label: 2 },
                    { value: 3, label: 3 },
                    { value: 4, label: 4 },
                    { value: 5, label: 5 },
                    { value: 6, label: 6 },
                    { value: 7, label: 7 },
                    { value: 8, label: 8 },
                    { value: 9, label: 9 },
                    { value: 10, label: 10 }
                ]}
                onChange={val => {
                    this.set("indentWidth", val)
                }}
            />
        )
    }

    getThemeInput = theme => {
        return (
            <ReactSelect
                name="theme-select"
                value={theme}
                options={[
                    { value: "apathy", label: "apathy" },
                    { value: "apathy:inverted", label: "apathy:inverted" },
                    { value: "ashes", label: "ashes" },
                    { value: "bespin", label: "bespin" },
                    { value: "brewer", label: "brewer" },
                    { value: "bright:inverted", label: "bright:inverted" },
                    { value: "bright", label: "bright" },
                    { value: "chalk", label: "chalk" },
                    { value: "codeschool", label: "codeschool" },
                    { value: "colors", label: "colors" },
                    { value: "eighties", label: "eighties" },
                    { value: "embers", label: "embers" },
                    { value: "flat", label: "flat" },
                    { value: "google", label: "google" },
                    { value: "grayscale", label: "grayscale" },
                    {
                        value: "grayscale:inverted",
                        label: "grayscale:inverted"
                    },
                    { value: "greenscreen", label: "greenscreen" },
                    { value: "harmonic", label: "harmonic" },
                    { value: "hopscotch", label: "hopscotch" },
                    { value: "isotope", label: "isotope" },
                    { value: "marrakesh", label: "marrakesh" },
                    { value: "mocha", label: "mocha" },
                    { value: "monokai", label: "monokai" },
                    { value: "ocean", label: "ocean" },
                    { value: "paraiso", label: "paraiso" },
                    { value: "pop", label: "pop" },
                    { value: "railscasts", label: "railscasts" },
                    { value: "rjv-default", label: "rjv-default" },
                    { value: "shapeshifter", label: "shapeshifter" },
                    {
                        value: "shapeshifter:inverted",
                        label: "shapeshifter:inverted"
                    },
                    { value: "solarized", label: "solarized" },
                    { value: "summerfruit", label: "summerfruit" },
                    {
                        value: "summerfruit:inverted",
                        label: "summerfruit:inverted"
                    },
                    { value: "threezerotwofour", label: "threezerotwofour" },
                    { value: "tomorrow", label: "tomorrow" },
                    { value: "tube", label: "tube" },
                    { value: "twilight", label: "twilight" }
                ]}
                onChange={val => {
                    this.set("theme", val)
                }}
            />
        )
    }

    set = (field, value) => {
        let state = {}
        state[field] = value.value
        this.setState(state)
    };

    //just a function to get an example JSON object
    getExampleJson = () => {
        return {
            string: "this is a test string",
            integer: 42,
            array: [1, 2, 3, "test", NaN],
            float: 3.14159,
            undefined: undefined,
            object: {
                "first-child": true,
                "second-child": false,
                "last-child": null
            },
            string_number: "1234",
            date: new Date()
        }
    }
}
