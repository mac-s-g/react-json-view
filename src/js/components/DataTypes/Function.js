import React from 'react';
import DataTypeLabel from './DataTypeLabel';

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
        this.setState({
            collapsed: !this.state.collapsed
        }, () => {
            // will be called after setState takes effect.
            AttributeStore.set(
                this.props.rjvId,
                this.props.namespace,
                'collapsed',
                this.state.collapsed
            );
        });
    };

    render() {
        const type_name = 'function';
        const { props } = this;
        const { collapsed } = this.state;

        return (
            <div {...Theme(props.theme, 'function')}>
                <DataTypeLabel type_name={type_name} {...props} />
                <span
                    {...Theme(props.theme, 'function-value')}
                    class="rjv-function-container"
                    onClick={this.toggleCollapsed}
                >
                    {this.getFunctionDisplay(collapsed)}
                </span>
            </div>
        );
    }

    getFunctionDisplay = collapsed => {
        const { props } = this;
        if (collapsed) {
            return (
                <span>
                    {this.props.value
                        .toString()
                        .slice(9, -1)
                        .replace(/\{[\s\S]+/, '')}
                    <span
                        class="function-collapsed"
                        style={{ fontWeight: 'bold' }}
                    >
                        <span>{'{'}</span>
                        <span {...Theme(props.theme, 'ellipsis')}>...</span>
                        <span>{'}'}</span>
                    </span>
                </span>
            );
        } else {
            return this.props.value.toString().slice(9, -1);
        }
    };
}
