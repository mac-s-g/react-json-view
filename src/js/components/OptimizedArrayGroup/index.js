import React from 'react';

import { ArraySubGroup } from './ArraySubGroup'
import VariableMeta from '../VariableMeta';
import ObjectName from '../ObjectName';
import Theme from '../../themes/getStyle';


//icons
import { CollapsedIcon, ExpandedIcon } from '../ToggleIcons';

//single indent is 5px
const SINGLE_INDENT = 5;

export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            expanded: !!this.props.expandFirstGroup
        };
    }

    toggleCollapsed = () => {
        this.setState((prevValue) => {
            return {
                expanded: !prevValue.expanded
            }
        });
    }

    getExpandedIcon = (expanded) => {
        const { theme, iconStyle } = this.props;

        if (expanded) {
            return <ExpandedIcon {...{ theme, iconStyle }} />;
        }

        return <CollapsedIcon {...{ theme, iconStyle }} />;
    }

    render() {
        const {
            src,
            groupArraysAfterLength,
            depth,
            name,
            theme,
            jsvRoot,
            namespace,
            parent_type,
            expandFirstGroup,
            ...rest
        } = this.props;

        let object_padding_left = 0;

        if (!jsvRoot) {
            object_padding_left = this.props.indentWidth * SINGLE_INDENT;
        }

        const groupingLevels = Math.floor(Math.log10(src.length));

        return (
            <div
                class="object-key-val"
                {...Theme(theme, jsvRoot ? 'jsv-root' : 'objectKeyVal', {
                    paddingLeft: object_padding_left
                })}
            >
                <ObjectName {...this.props} />
                <span>
                    <VariableMeta size={src.length} {...this.props} />
                </span>
                <ArraySubGroup 
                    theme={theme}
                    getExpandedIcon={this.getExpandedIcon}
                    src={src}
                    height={groupingLevels}
                    expanded={this.state.expanded}
                    rest={rest}
                    namespace={namespace}
                    name={name}
                    start={0}
                    toggleCollapsed={this.toggleCollapsed}
                    expandFirstGroup={expandFirstGroup}
                />
            </div>
        );
    }
}
