import React from 'react';
import dispatcher from './../helpers/dispatcher';

import CopyToClipboard from './CopyToClipboard';
import PasteToJson from './PasteToJson';
import CutFromJson from './CutFromJson';
import { toType } from '../helpers/util';

//icons
import { RemoveIcon as Remove, AddCircle as Add } from './icons';

//theme
import Theme from './../themes/getStyle';
import ObjectAttributes from '../stores/ObjectAttributes';
import ExternalPaste from './ExternalPaste';
export default class extends React.PureComponent {
    getObjectSize = () => {
        const { size, theme, displayObjectSize } = this.props;
        if (displayObjectSize) {
            return (
                <span class="object-size" {...Theme(theme, 'object-size')}>
                    {size} item{size === 1 ? '' : 's'}
                </span>
            );
        }
    };

    handleAdd = () => {
        const {
            namespace,
            name,
            src,
            rjvId,
            depth
        } = this.props;
        const namespaceCopy = [...namespace];
        //expand the object/array
        ObjectAttributes.set(
            rjvId,
            namespace,
            'expanded',
            true
        );
        const request = {
            name: depth > 0 ? name : null,
            namespace: namespace.splice(
                0, (namespace.length-1)
            ),
            existing_value: src,
            variable_removed: false,
            key_name: null
        };
        if (toType(src) === 'object') {
            dispatcher.dispatch({
                name: 'ADD_VARIABLE_KEY_REQUEST',
                rjvId: rjvId,
                data: request,
            });
        } else {
            //expand every object/array in the array
            Object.keys(src).forEach(key => {
                namespaceCopy.splice(namespaceCopy.length, 0, key);
                ObjectAttributes.set(
                    rjvId,
                    namespaceCopy,
                    'expanded',
                    true
                );
                namespaceCopy.splice(namespaceCopy.length - 1, 1);
            });
            dispatcher.dispatch({
                name: 'VARIABLE_ADDED',
                rjvId: rjvId,
                data: {
                    ...request,
                    new_value: [null, ...src]
                }
            });
        }
    }

    getAddAttribute = () => {
        const { theme } = this.props;

        return (
            <span
                class="click-to-add"
                title="Add">
                <Add
                    class="click-to-add-icon"
                    {...Theme(theme, 'addVarIcon')}
                    onClick={ () => this.handleAdd() }
                />
            </span>
        );
    };

    getRemoveObject = rowHovered => {
        const { theme, namespace, name, src, rjvId } = this.props;

        //don't allow deleting of root node
        if (namespace.length === 1) {
            return;
        }
        return (
            <span
                class="click-to-remove"
                style={{
                    display: rowHovered ? 'inline-block' : 'none'
                }}
                title="Remove">
                <Remove
                    class="click-to-remove-icon"
                    {...Theme(theme, 'removeVarIcon')}
                    onClick={() => {
                        dispatcher.dispatch({
                            name: 'VARIABLE_REMOVED',
                            rjvId: rjvId,
                            data: {
                                name: name,
                                namespace: namespace.splice(
                                    0,
                                    namespace.length - 1
                                ),
                                existing_value: src,
                                variable_removed: true
                            }
                        });
                    }}
                />
            </span>
        );
    };

    render = () => {
        const {
            theme,
            onDelete,
            onAdd,
            enableClipboard,
            src,
            namespace,
            rowHovered,
            name,
            rjvId,
            jsvRoot
        } = this.props;
        return (
            <div
                {...Theme(theme, 'object-meta-data')}
                class="object-meta-data"
                onClick={ e => {
                    e.stopPropagation();
                } }
            >
                {/* size badge display */}
                { this.getObjectSize() }
                { enableClipboard && !jsvRoot &&
                    <CopyToClipboard
                        clickCallback={ enableClipboard }
                        { ...{src, rjvId, theme, namespace, name} }
                    />
                }
                {/*Don't display cut icon for root*/}
                { (enableClipboard && !jsvRoot) &&
                    <CutFromJson
                        { ...this.props }
                    />
                }
                {/*don't display paste icon for root*/}
                { (enableClipboard && !jsvRoot) &&
                    <PasteToJson
                        pastedOnObjectOrArray
                        { ...this.props }
                    />
                }
                { (enableClipboard && !jsvRoot) &&
                    <ExternalPaste
                        pastedOnObjectOrArray
                        { ...this.props }
                    />
                }
                {/* copy add/remove icons */}
                { onAdd !== false && this.getAddAttribute(rowHovered) }
                { onDelete !== false && this.getRemoveObject(rowHovered) }
            </div>
        );
    };
}
