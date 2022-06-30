import React from 'react';
import DataTypeLabel from './DataTypeLabel';
import { toType } from './../../helpers/util';
import { highlight } from './../../helpers/highlight-words-core';

//theme
import Theme from './../../themes/getStyle';

//attribute store for storing collapsed state
import AttributeStore from './../../stores/ObjectAttributes';

export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: AttributeStore.get(
                props.rjvId,
                props.namespace,
                'collapsed',
                true
            )
        };
    }

    toggleCollapsed = () => {
        this.setState(
            {
                collapsed: !this.state.collapsed
            },
            () => {
                AttributeStore.set(
                    this.props.rjvId,
                    this.props.namespace,
                    'collapsed',
                    this.state.collapsed
                );
            }
        );
    };

    render() {
        const type_name = 'string';
        const { collapsed } = this.state;
        const { props } = this;
        const {
            collapseStringsAfterLength,
            theme,
            autoEscape,
            caseSensitive,
            searchWords,
            highlightStyle,
            highlightClassName
        } = props;
        let { value } = props;
        let collapsible = toType(collapseStringsAfterLength) === 'integer';
        let style = { style: { cursor: 'default' } };

        const options = {
            autoEscape,
            caseSensitive,
            searchWords,
            highlightStyle,
            highlightClassName,
            textToHighlight: value.substring(0, collapseStringsAfterLength)
        };

        if (collapsible && value.length > collapseStringsAfterLength) {
            style.style.cursor = 'pointer';

            if (this.state.collapsed) {
                value = (
                    <span>
                        {highlight(options)}
                        <span {...Theme(theme, 'ellipsis')}> ...</span>
                    </span>
                );
            }
        }

        return (
            <div {...Theme(theme, 'string')}>
                <DataTypeLabel type_name={type_name} {...props} />
                <span
                    class="string-value"
                    {...style}
                    onClick={this.toggleCollapsed}
                >
                    "
                    {typeof value === 'string'
                        ? highlight({
                              ...options,
                              textToHighlight: value
                          })
                        : value}
                    "
                </span>
            </div>
        );
    }
}
