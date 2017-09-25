import React from 'react';
import DataTypeLabel from './DataTypeLabel';

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
        );
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
        const type_name = 'function';
        const {props} = this;
        const {collapsed} = this.state;

        return (
        <div {...Theme(props.theme, 'function')} >
            <DataTypeLabel type_name={type_name} {...props} />
            <span class="rjv-function-container"
            onClick={()=>{this.toggleCollapsed()}} >
            {this.getFunctionDisplay(collapsed)}
            </span>
        </div>
        );
    }

    getFunctionDisplay = (collapsed) => {
        const {props} = this;

        if (collapsed) {
            return (<span >
                {this.props.value.toString().slice(9, -1).replace(/\{[\s\S]+/, '')}
                <span class='function-collapsed' style={{fontWeight: 'bold'}}>
                    <span>{"{"}</span>
                    <span {...Theme(props.theme, 'ellipsis')}>...</span>
                    <span>{"}"}</span>
                </span>
            </span>);
        } else {
            return this.props.value.toString().slice(9, -1);
        }
    }

}