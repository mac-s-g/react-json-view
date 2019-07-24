import React from 'react';
import DataTypeLabel from './DataTypeLabel';
import { toType } from './../../helpers/util';

//theme
import Theme from './../../themes/getStyle';

//attribute store for storing collapsed state
import AttributeStore from './../../stores/ObjectAttributes';

/**
 * https://github.com/facebook/react/issues/9678#issuecomment-301126758
 * Used to suppress click events for text selection.
 * @example <div {...OnClick(onClick)}/>
 */
export const OnClick = (() => {
    let pos = {x: 0, y: 0};
    return onClick => ({
        onMouseDown: ({nativeEvent: e}) => {pos.x = e.x; pos.y = e.y;},
        onMouseUp: ({nativeEvent: e}) => {onClick && Math.abs(pos.x - e.x) < 8 && Math.abs(pos.y - e.y) < 8 && onClick();},
    });
})();

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

    render() {
        const type_name = 'string';
        const { collapsed } = this.state;
        const { props } = this;
        const { collapseStringsAfterLength, theme } = props;
        let { value } = props;
        let collapsible = toType(collapseStringsAfterLength) === 'integer';
        let style = { style: { cursor: 'default' } };

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

        return (
            <div {...Theme(theme, 'string')}>
                <DataTypeLabel type_name={type_name} {...props} />
                <span
                    class="string-value"
                    {...style}
                    {...OnClick(this.toggleCollapsed)}
                >
                    "{value}"
                </span>
            </div>
        );
    }
}
