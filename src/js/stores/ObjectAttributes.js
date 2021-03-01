import { EventEmitter } from 'events';
import dispatcher from './../helpers/dispatcher';
import { toType } from '../helpers/util';

//store persistent display attributes for objects and arrays
class ObjectAttributes extends EventEmitter {
    objects = {}

    set = (rjvId, name, key, value) => {
        if (this.objects[rjvId] === undefined) {
            this.objects[rjvId] = {};
        }
        if (this.objects[rjvId][name] === undefined) {
            this.objects[rjvId][name] = {};
        }
        this.objects[rjvId][name][key] = value;
    }

    get = (rjvId, name, key, default_value) => {
        if (this.objects[rjvId] === undefined
            || this.objects[rjvId][name] === undefined
            || this.objects[rjvId][name][key] === undefined
        ) {
            return default_value;
        }
        return this.objects[rjvId][name][key];
    }

    getSrcByNamespace = (rjvId, name, namespace, type, parent_type) => {
        if (this.objects[rjvId] === undefined
            || this.objects[rjvId][name] === undefined
        ) {
            return null;
        }

        namespace.shift();

        //deep copy of src variable
        let updated_src = this.deepCopy(this.objects[rjvId].global.src, [...namespace]);

        //point at current index
        let walk = updated_src;
        for (const idx of namespace) {
            walk = walk[idx];
        }
        //return as array if parent is array (for slicing)
        return parent_type === 'object' ? {...walk} : [...walk];
    }

    handleAction = (action) => {
        const {rjvId, data, name} = action;
        switch (name) {
        case 'RESET':
            this.emit('reset-' + rjvId);
            break;
        case 'VARIABLE_UPDATED':
            action.data.updated_src = this.updateSrc(
                rjvId, data
            );
            this.set(
                rjvId, 'action', 'variable-update',
                {...data, type: 'variable-edited'}
            );
            this.emit('variable-update-' + rjvId);
            break;
        case 'VARIABLE_REMOVED':
            action.data.updated_src = this.updateSrc(
                rjvId, data
            );
            this.set(
                rjvId, 'action', 'variable-update',
                {...data, type: 'variable-removed'}
            );
            this.emit('variable-update-' + rjvId);
            break;
        case 'VARIABLE_ADDED':
            action.data.updated_src = this.updateSrc(
                rjvId, data
            );
            this.set(
                rjvId, 'action', 'variable-update',
                {...data, type: 'variable-added'}
            );
            this.emit('variable-update-' + rjvId);
            break;
        case 'VARIABLE_COPIED':
            this.emit('copied-' + rjvId);
            break;
        case 'ADD_VARIABLE_KEY_REQUEST':
            this.set(rjvId, 'action', 'new-key-request', data);
            this.emit('add-key-request-' + rjvId);
            break;
        case 'UPDATE_VARIABLE_KEY_REQUEST':
            this.set(rjvId, 'action', 'edit-key-request', data);
            this.emit('edit-key-request-' + rjvId);
            break;
        case 'VARIABLE_KEY_UPDATED':
            action.data.updated_src = this.updateSrc(
                rjvId, data
            );
            this.set(rjvId, 'action', 'variable-update',{...data, type:'variable-key-added'});
            this.emit('variable-update-' + rjvId);
            break;
        }
    }

    updateSrc = (rjvId, request) => {
        let {
            name,
            namespace,
            new_value,
            variable_removed,
            variable_key_updated,
        } = request;

        namespace.shift();

        //deepy copy src
        let src = this.get(rjvId, 'global', 'src');
        //deep copy of src variable
        let updated_src = this.deepCopy(src, [...namespace]);
        //point at current index
        let walk = updated_src;
        for (const idx of namespace) {
            walk = walk[idx];
        }
        if (variable_key_updated) {
            if (toType(walk) === 'array') {
                walk.splice(name, 1);
            } else if (name !== null && name) {
                walk[name] = new_value;
            } else {
                updated_src = new_value;
            }
        }
        else if (variable_removed) {
            if (toType(walk) === 'array') {
                walk.splice(name, 1);
            } else {
                delete walk[name];
            }
        } else {
            //update copied variable at specified namespace
            if (name !== null && name) {
                walk[name] = new_value;
            } else {
                updated_src = new_value;
            }
        }

        this.set(
            rjvId, 'global', 'src', updated_src
        );

        return updated_src;
    }

    deepCopy = (src, copy_namespace) => {
        const type = toType(src);
        let result;
        let idx = copy_namespace.shift();
        if (type === 'array') {
            result = [...src];
        } else if (type === 'object') {
            result = {...src};
        }
        if (idx !== undefined) {
            result[idx] = this.deepCopy(src[idx], copy_namespace);
        }
        return result;
    }
}

const attributeStore = new ObjectAttributes;
dispatcher.register(attributeStore.handleAction.bind(attributeStore));
export default attributeStore;
