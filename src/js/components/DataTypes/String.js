import React from 'react';
import DataTypeLabel from './DataTypeLabel';
import {toType} from './../../helpers/util';

//theme
import Theme from './../../themes/getStyle';

//attribute store for storing collapsed state
import AttributeStore from './../../stores/ObjectAttributes';

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state.collapsed = AttributeStore.get(
            props.rjvId,
            props.namespace,
            'collapsed',
            true
        )
    }

    state = {
        collapsed: true
    }

    toggleCollapsed = () => {
        this.state.collapsed = !this.state.collapsed;
        AttributeStore.set(
            this.props.rjvId,
            this.props.namespace,
            'collapsed',
            this.state.collapsed
        );
        this.setState(this.state);
    }

    render() {
        const type_name = 'string';
        const {collapsed} = this.state;
        const {props} = this;
        const {collapseStringsAfterLength} = props;
        let {value} = props;
        let collapsible = toType(collapseStringsAfterLength) == 'integer';
        let style = {style: {cursor: 'default'}};

        if (collapsible
            && value.length > collapseStringsAfterLength
        ) {
            style.style.cursor = 'pointer';
            if (this.state.collapsed) {
                value = value.substring(0, collapseStringsAfterLength)
                    + "...";
            }
        }

        return (
        <div
        class="string-container"
        {...Theme(props.theme, 'string')}
        onClick={this.toggleCollapsed}
        >
            <DataTypeLabel type_name={type_name} {...props} />
            <span class="string-value" {...style}>"{value}"</span>
        </div>
        );
    }

}