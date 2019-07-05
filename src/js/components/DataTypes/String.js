import React from 'react';
import DataTypeLabel from './DataTypeLabel';
import { toType } from './../../helpers/util';

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
            AttributeStore.set(
                this.props.rjvId,
                this.props.namespace,
                'collapsed',
                this.state.collapsed
            );
        });
    }
    
    isEmailAddress(str) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(str.toLowerCase());
    }
    
    render() {
        const type_name = 'string';
        const { collapsed } = this.state;
        const { props } = this;
        const { collapseStringsAfterLength, theme } = props;
        let { value, autoLinkStrings } = props;
        let collapsible = toType(collapseStringsAfterLength) === 'integer';
        let style = { style: { cursor: 'default' } };
        const valueString = value;

        if (collapsible && value.length > collapseStringsAfterLength) {
            style.style.cursor = 'pointer';
            if (this.state.collapsed) {
                value = (
                    <span>
                        {value.substring(0, collapseStringsAfterLength)}
                        <span {...Theme(theme, 'ellipsis')}> ...</span>
                    </span>
                );
            }
        }
        
        const valueIsEmailAddress = this.isEmailAddress(valueString);
        if (autoLinkStrings && (valueString.startsWith('http') || valueIsEmailAddress)) {
            value = <a href={`${valueIsEmailAddress ? 'mailto:' : ''}${valueString}`} target={'_blank'}>{valueString}</a>;
        }

        return (
            <div {...Theme(theme, 'string')}>
                <DataTypeLabel type_name={type_name} {...props} />
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
