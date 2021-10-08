import React from 'react';
import DataTypeLabel from './DataTypeLabel';
import { toType } from './../../helpers/util';
import highlightedString from './../../helpers/highlightedString';
import searchStringIndex from './../../helpers/searchStringIndex';

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
        setTimeout(() => {
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
        }, 200);
    };

    isValueCollapsible = () => {
        const { collapseStringsAfterLength, value } = this.props;

        return (
            toType(collapseStringsAfterLength) === 'integer' &&
            value.length > collapseStringsAfterLength
        );
    };

    getValue = () => {
        const {
            value,
            search,
            theme,
            collapseStringsAfterLength: collapseLength
        } = this.props;
        const startIndex = searchStringIndex(value, search);
        const valueShouldBeCollapsed =
            this.isValueCollapsible() && this.state.collapsed;
        let result = value;

        if (startIndex > -1) {
            result = highlightedString(value, startIndex, search.length, theme);
        }

        if (valueShouldBeCollapsed) {
            result = (
                <span>
                    {value.substring(0, collapseLength)}
                    <span {...Theme(theme, 'ellipsis')}> ...</span>
                </span>
            );
        }

        return result;
    };

    getStyle = () => {
        let cursor = 'default';

        if (this.isValueCollapsible()) {
            cursor = 'pointer';
        }

        return { style: { cursor } };
    };

    render() {
        const value = this.getValue();
        let style = this.getStyle();

        return (
            <div {...Theme(this.props.theme, 'string')}>
                <DataTypeLabel type_name="string" {...this.props} />
                <span
                    class="string-value"
                    {...style}
                    onClick={this.toggleCollapsed}
                >
                    "{value}"
                </span>
            </div>
        );
    }
}
