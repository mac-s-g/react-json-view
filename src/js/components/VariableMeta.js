import React from 'react';
import dispatcher from './../helpers/dispatcher';

import {toType} from './../helpers/util';

//icons
import {
    Clippy, RemoveCircle as Remove, AddCircle as Add
} from './icons';

//theme
import Theme from './../themes/getStyle';


export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = { copied: false };

        this.copiedTimer = null;
    }

    componentWillUnmount() {
        if (this.copiedTimer) {
            clearTimeout(this.copiedTimer);
            this.copiedTimer = null;
        }
    }

    handleCopy = () => {
        const container = document.createElement('textarea');
        const {enableClipboard, src, namespace} = this.props;

        container.innerHTML = JSON.stringify(src, null, '  ');

        document.body.appendChild(container);
        container.select();
        document.execCommand('copy');

        document.body.removeChild(container);

        this.copiedTimer = setTimeout(() => {
            this.setState({
                copied: false
            });
        }, 5500)

        this.setState({ copied: true }, () => {
            if (typeof enableClipboard !== "function") {
                return;
            }

            enableClipboard({
                src:src,
                namespace: namespace,
                name: namespace[namespace.length - 1]
            });
        })
    }

    getCopyComponent = () => {
        const {src, size, theme, enableClipboard} = this.props;
        let style = Theme(theme, 'copy-to-clipboard').style;
        
        return (
            enableClipboard ?
            <span class="copy-to-clipboard-container" >
                <span
                style={{
                    ...style,
                    display: 'inline-block'
                }}
                onClick={this.handleCopy}
                >{this.getClippyIcon()}</span>
            </span>
            : null
        );
    }

    getClippyIcon = () => {
        const {theme} = this.props;

        if (this.state.copied) {
            return (<span>
                <Clippy class="copy-icon" {...Theme(theme, 'copy-icon')} />
                <span {...Theme(theme, 'copy-icon-copied')}>✔</span>
            </span>)
        }

        return <Clippy class="copy-icon" {...Theme(theme, 'copy-icon')} />
    }

    getObjectSize = () => {
        const {size, theme, displayObjectSize} = this.props;
        if (displayObjectSize) {
            return (
                <span class="object-size"
                {...Theme(theme, 'object-size')}>
                    {size} item{size == 1 ? '' : 's'}
                </span>
            );
        }
    }

    getAddAttribute = () => {
        const {
            theme, namespace, name, src, rjvId, depth
        } = this.props;

        return (
        <span
        class="click-to-add"
        style={{verticalAlign: 'top'}}>
            <Add
            class="click-to-add-icon"
            {...Theme(theme, 'addVarIcon')}
            onClick={() => {
                const request = {
                    name: depth > 0 ? name : null,
                    namespace: namespace.splice(
                        0, (namespace.length-1)
                    ),
                    existing_value: src,
                    variable_removed: false,
                    key_name: null
                };
                if (toType(src) == 'object') {
                    dispatcher.dispatch({
                        name: 'ADD_VARIABLE_KEY_REQUEST',
                        rjvId: rjvId,
                        data: request,
                    });
                } else {
                    dispatcher.dispatch({
                        name: 'VARIABLE_ADDED',
                        rjvId: rjvId,
                        data: {
                            ...request,
                            new_value: [...src, null]
                        }
                    });
                }
            }}
            />
        </span>
        );
    }

    getRemoveObject = () => {
        const {
            theme, hover, namespace, name, src, rjvId
        } = this.props;

        //don't allow deleting of root node
        if (namespace.length == 1) {return}

        return (
        <span class="click-to-remove" >
            <Remove
            class="click-to-remove-icon"
            {...Theme(theme, 'removeVarIcon')}
            onClick={() => {
                dispatcher.dispatch({
                    name: 'VARIABLE_REMOVED',
                    rjvId: rjvId,
                    data: {
                        name: name,
                        namespace: namespace.splice(0, (namespace.length-1)),
                        existing_value: src,
                        variable_removed: true
                    },
                });
            }}
            />
        </span>
        );
    }

    render = () => {
        const {theme, onDelete, onAdd} = this.props;
        return (
        <div {...Theme(theme, 'object-meta-data')}
        class='object-meta-data'
        onClick={(e)=>{
            e.stopPropagation();
        }}>
            {/* size badge display */}
            {this.getObjectSize()}
            {/* copy to clipboard icon */}
            {this.getCopyComponent()}
            {/* copy add/remove icons */}
            {onAdd !== false ? this.getAddAttribute() : null}
            {onDelete !== false ? this.getRemoveObject() : null}
        </div>
        );
    }

}