import React, {Component} from 'react';
import dispatcher from '../helpers/dispatcher';

const dragThreshold = 8; // Required movement before drag starts
const dropBorderPx = 5;

const borderTransparent = '3px solid transparent';
const borderColor = '3px solid rgba(255, 128, 0, 0.3)';

class DragWrapper extends Component {
    constructor(props) {
        super(props);
        this.dragContainer = document.createElement('div');
        this.dragContainer.className = 'config-editor drag-container';
        this.state = {
            dragAllowed: true,
            prevDropTarget: undefined,
        };
    }

    handleMouseDown = event => {
        event.preventDefault();
        if (this.el !== event.target.closest('[data-drop-target="true"')) {
            return;
        }
        this.dragStartPos = {
            x: event.clientX,
            y: event.clientY,
        };

        document.body.addEventListener('mousemove', this.handleDragMove);
        document.body.addEventListener('mouseup', this.handleDragEnd);
        document.body.addEventListener('mouseleave', this.cleanUpDrag);
    }

    handleDragMove = event => {
        if (!this.dragging) {
            const dx = this.dragStartPos.x - event.clientX;
            const dy = this.dragStartPos.y - event.clientY;
            const delta = Math.sqrt(dx * dx + dy * dy);
            if (delta >= dragThreshold) {
                this.dragging = true;
                const keyElement = this.el.querySelector('.object-key');
                const varElement = this.el.querySelector('.variable-row');
                let contentClone = keyElement ? keyElement.cloneNode(true)
                    : varElement ? varElement.cloneNode(true) : undefined;
                const editElement = contentClone.querySelector('.click-to-edit');
                const removeElement = contentClone.querySelector('.click-to-remove');
                if (editElement) editElement.remove();
                if (removeElement) removeElement.remove();
                if (contentClone) {
                    contentClone.style.cssText = {padding: '0'};
                    this.dragContainer.appendChild(contentClone);
                    document.body.appendChild(this.dragContainer);
                }
            }
        }
        if (this.dragging) {
            this.positionDragContainer(event.clientX, event.clientY);
            this.setDragOver(event.target, event.clientX, event.clientY);
        }
    }

    clearBorders = (target) => {
        if (target && target.getAttribute('data-drop-marker') === 'drop-before') {
            target.style.borderTop = borderTransparent;
        } else if (target && target.getAttribute('data-drop-marker') === 'drop-after') {
            target.style.borderTop = borderTransparent;
            target.style.borderBottom = borderTransparent;
        }
    }

    cleanUpDrag = () => {
        //clear borders after drag end
        this.clearBorders(this.state.prevDropTarget);

        this.dragContainer.innerHTML = '';
        if (this.dragContainer.parentNode) {
            this.dragContainer.parentNode.removeChild(this.dragContainer);
        }
        document.body.removeEventListener('mousemove', this.handleDragMove);
        document.body.removeEventListener('mouseup', this.handleDragEnd);
        document.body.removeEventListener('mouseleave', this.cleanUpDrag);
        this.dragging = false;

        document.body.style.cursor = 'auto';
    }

    triggerDrop = (el, x, y) => {
        const {
            depth,
            namespace,
            rjvId,
            src
        } = this.props;

        const dropTarget = el.closest('.tree-node-container');
        const canDrop = dropTarget &&
            dropTarget.getAttribute('data-drop-target') === 'true' &&
            dropTarget.getAttribute('data-can-drop') === 'true' &&
            dropTarget.getAttribute('data-parent-name') === namespace.toString();
        if (!dropTarget || !canDrop || !this.el || this.el === dropTarget || this.el.contains(dropTarget)) {
            return;
        }
        const targetNodeId = dropTarget.getAttribute('data-node-id');
        const dropPosition = this.getDropPosition(dropTarget, x, y);
        const droppableNodeId = this.el.getAttribute('data-node-id');
        const request = {
            name: depth > 0 ? namespace[depth] : null,
            namespace: namespace.splice(
                0, (namespace.length - 1)
            ),
            existing_value: src,
            variable_removed: false,
            key_name: null
        };
        let new_value;
        //rearranging node in object
        const dropTargetParent = dropTarget.parentNode.closest('.tree-node-container');
        //rearranging node in array
        if (dropTargetParent && dropTargetParent.getAttribute('data-isarray') === 'true') {
            new_value = this.changeArrayOrder(dropPosition, src, droppableNodeId, targetNodeId);
        }
        //rearranging node in object
        else {
            new_value = this.changeObjectOrder(dropPosition, src, droppableNodeId, targetNodeId);
        }
        dispatcher.dispatch({
            name: 'VARIABLE_ADDED',
            rjvId: rjvId,
            data: {
                ...request,
                new_value: new_value
            }
        });
    }
    
    changeArrayOrder = (dropPosition, src, droppableNodeId, targetNodeId) => {
        let copy = src[droppableNodeId];
        if (dropPosition === 'before' || dropPosition === 'inside') {
            if (+droppableNodeId + 1 === +targetNodeId) {
                return src;
            } else {
                //remove droppable element from array
                src.splice(droppableNodeId, 1);
                //dropped upwards
                if (+targetNodeId < +droppableNodeId) {
                    src.splice(targetNodeId, 0, copy);
                }
                //dropped downwards
                else {
                    //add removed element to the dropped position in array
                    src.splice(targetNodeId - 1, 0, copy);
                }
            }
        } else {
            //remove droppable element from array
            src.splice(droppableNodeId, 1);
            //add removed element to the dropped position in array
            src.splice(targetNodeId, 0, copy);
        }
        return src;
    }
    
    changeObjectOrder = (dropPosition, src, droppableNodeId, targetNodeId, ) => {
        let newObject = {};
        let copy = Object.entries(src).find(([key, value]) => key === droppableNodeId);
        delete src[droppableNodeId];
        const dropTargetIdx = Object.keys(src).findIndex(key => key === targetNodeId);
        if (dropPosition === 'after' && dropTargetIdx === Object.keys(src).length - 1) {
            Object.keys(src).forEach((key, idx) => {
                newObject[key] = src[key];
                if (idx === dropTargetIdx) {
                    newObject[copy[0]] = copy[1];
                }
            });
            return newObject;
        } else {
            const shift = dropPosition === 'before' || dropPosition === 'inside' ? 0 : 1;
            Object.keys(src).forEach((key, idx) => {
                if (idx === dropTargetIdx + shift) {
                    newObject[copy[0]] = copy[1];
                }
                newObject[key] = src[key];
            });
            return newObject;
        }
    }

    handleDragEnd = event => {
        if (this.dragging) {
            this.triggerDrop(event.target, event.clientX, event.clientY);
        }
        this.cleanUpDrag();
    }

    positionDragContainer = (x, y) => {
        this.dragContainer.style.top = y + 'px';
        this.dragContainer.style.left = x + 30 + 'px';
    };

    getDropPosition = (dropTarget, x, y) => {
        const targetRect = dropTarget.getBoundingClientRect();

        return y <= targetRect.top + dropBorderPx ? 'before'
            : y >= targetRect.bottom - dropBorderPx ? 'after'
                : 'inside';
    }

    //Dragging over other elements and set drop marker
    setDragOver = (el, x, y) => {
        const { prevDropTarget } = this.state;
        const dropTarget = el.closest('[data-drop-target="true"');
        //clear borders
        if (dropTarget !== prevDropTarget) {
            this.clearBorders(this.state.prevDropTarget);
        }
        document.body.style.cursor = 'auto';

        const canDropInSameParent = dropTarget.getAttribute('data-parent-name') === this.el.getAttribute('data-parent-name');

        if (!canDropInSameParent || !dropTarget || !this.el || this.el === dropTarget || this.el.contains(dropTarget)) {
            //Can not drop into itself
            //Can not drop when no target
            //Can't drop between different objects/arrays
            return;
        }
        let dropPosition = this.getDropPosition(dropTarget, x, y);
        //disable drop inside for variable editor and display drop before marker when trying to drop inside
        if ((dropPosition === 'before' || dropPosition === 'inside') && dropTarget.getAttribute('data-drop-marker') === 'drop-before') {
            dropTarget.style.borderTop = borderColor;
        } else if (dropPosition === 'after' && dropTarget.getAttribute('data-drop-marker') === 'drop-after') {
            dropTarget.style.borderBottom = borderColor;
            dropTarget.style.borderTop = borderTransparent;
        } else if ((dropPosition === 'before' || dropPosition === 'inside') && dropTarget.getAttribute('data-drop-marker') === 'drop-after') {
            dropTarget.style.borderTop = borderColor;
            dropTarget.style.borderBottom = borderTransparent;
        }
        this.setState({
            prevDropTarget: dropTarget
        });
        if (dropTarget.getAttribute('data-can-drop') === 'false') {
            document.body.style.cursor = 'not-allowed';
            return;
        }
    }

    render() {
        const {
            name,
            dropMarker,
            depth,
            namespace,
            dragAllowed,
            canDrop,
            isArray,
            value
        } = this.props;

        let borders = {
            'borderTop': borderTransparent
        };
        if (dropMarker === 'drop-after') {
            borders = {
                'borderTop': borderTransparent,
                'borderBottom': borderTransparent
            };
        }
        return (
            <div
                style={ borders }
                className='drag-wrapper tree-node-container'
                data-isarray={ isArray }
                data-drop-target={ true }
                data-node-value={ value }
                data-can-drop={ canDrop }
                ref={ el => this.el = el }
                data-node-id={ name }
                data-drop-marker={ dropMarker }
                onMouseDown={ dragAllowed && this.handleMouseDown }
                key={ name }
                data-parent-name={ namespace }
                data-drop-depth={ depth }>
                { this.props.children }
            </div>
        );
    }
}

export default DragWrapper;