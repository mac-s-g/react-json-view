import React from 'react';

import { CollapsedArray } from './CollapsedArray';
import { getArrayGroupState } from './utils';
import ObjectComponent from '../DataTypes/Object';
import Theme from '../../themes/getStyle';

export class ArraySubGroup extends React.Component {

    constructor(props) {
        super(props);
        const { height, src, start, expandFirstGroup } = props;

        this.size = Math.pow(10, height);
        const groups = Math.ceil(src.length/this.size);

        this.state = {
            expanded: [...getArrayGroupState(
                start,
                expandFirstGroup,
                groups,
                )]
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.expanded || this.props.expanded)
            return true;

        if(
            nextProps.start !== this.props.start ||
            nextProps.src?.length !== this.props.src?.length
        )
            return true;
        
        return false;
    }

    render() {
        const {
            theme,
            expanded: parentExpanded,
            getExpandedIcon,
            toggleCollapsed: toggleParentCollapsed,
            src,
            height,
            namespace,
            name,
            start,
            expandFirstGroup,
            rest,
        } = this.props
    
        const toggleCollapsed = i => {
            this.setState(prevState => {
                const newExpanded = [...prevState.expanded]
                newExpanded[i] = !newExpanded[i]
    
                return {
                    expanded: newExpanded
                };
            })
        }
    
        return <React.Fragment>
            <div
                class="object-key-val array-group"
                {...Theme(theme, 'objectKeyVal', {
                    marginLeft: 6,
                    paddingLeft: 5
                })}
            >
                <span {...Theme(theme, 'brace-row')}>
                    <div
                        class="icon-container"
                        {...Theme(theme, 'icon-container')}
                        onClick={toggleParentCollapsed}
                    >
                        {getExpandedIcon(parentExpanded)}
                    </div>
                    { parentExpanded ? (
                        height < 1 ? (
                            <ObjectComponent
                                depth={0}
                                name={false}
                                collapsed={false}
                                groupArraysAfterLength={10}
                                index_offset={start}
                                src={src}
                                namespace={namespace}
                                type="array"
                                parent_type="array_group"
                                theme={theme}
                                {...rest}
                            />
                        ) : this.state.expanded.map((isExpanded, i) => {
                            const groupStart = i * this.size
    
                            return <ArraySubGroup
                                key={name+'_'+height+'_'+i}
                                name={name}
                                height={height - 1}
                                src={src.slice(groupStart, groupStart + this.size)}
                                start={start + groupStart}
                                expanded={isExpanded}
                                toggleCollapsed={() => toggleCollapsed(i)}
                                rest={rest}
                                theme={theme}
                                getExpandedIcon={getExpandedIcon}
                                namespace={namespace}
                                expandFirstGroup={expandFirstGroup}
                            />
                        })
                        ) : (
                            <CollapsedArray 
                                theme={theme}
                                start={start}
                                end={start + src.length - 1}
                                onClick={toggleParentCollapsed}
                            />
                        )}
                </span>
            </div>
            
        </React.Fragment>
    }
}