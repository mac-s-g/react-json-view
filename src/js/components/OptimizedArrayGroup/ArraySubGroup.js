import React, { useState } from 'react';

import { CollapsedArray } from './CollapsedArray';
import { getArrayGroupState } from './utils';
import ObjectComponent from '../DataTypes/Object';
import Theme from '../../themes/getStyle';

export const ArraySubGroup = props => {

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
    } = props

    const size = Math.pow(10, height)
    const groups = Math.ceil(src.length/size)

    const [expanded, setExpanded] = useState([...getArrayGroupState(start, expandFirstGroup, groups)])

    const toggleCollapsed = i => {
        setExpanded(prevExpanded => {
            const newExpanded = [...prevExpanded]
            newExpanded[i] = !newExpanded[i]

            return newExpanded;
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
                            src={src}
                            namespace={namespace}
                            type="array"
                            parent_type="array_group"
                            theme={theme}
                            {...rest}
                        />
                    ) : expanded.map((isExpanded, i) => {
                        const groupStart = i * size

                        return <ArraySubGroup
                            key={name+'_'+height+'_'+i}
                            name={name}
                            height={height - 1}
                            src={src.slice(groupStart, groupStart + size)}
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