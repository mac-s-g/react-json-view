import {EventEmitter} from "events";
import dispatcher from './../helpers/dispatcher';
import {toType} from './../helpers/util';

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
            || this.objects[rjvId][name][key] == undefined
        ) {
            return default_value;
        }
        return this.objects[rjvId][name][key];
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
                    {...data, type:'variable-edited'}
                );
                this.emit('variable-update-' + rjvId)
                break;
            case 'VARIABLE_REMOVED':
                action.data.updated_src = this.updateSrc(
                    rjvId, data
                );
                this.set(
                    rjvId, 'action', 'variable-update',
                    {...data, type:'variable-removed'}
                );
                this.emit('variable-update-' + rjvId)
                break;
            case 'VARIABLE_ADDED':
                action.data.updated_src = this.updateSrc(
                    rjvId, data
                );
                this.set(
                    rjvId, 'action', 'variable-update',
                    {...data, type:'variable-added'}
                );
                this.emit('variable-update-' + rjvId)
                break;
            case 'ADD_VARIABLE_KEY_REQUEST':
                this.set(rjvId, 'action', 'new-key-request', data);
                this.emit('add-key-request-' + rjvId);
        }
    }

    updateSrc = (rjvId, request) => {
        let {
            name, namespace, new_value, existing_value,
            variable_removed, key_name
        } = request;

        namespace.shift();

        //deepy copy src
        let src = this.get(rjvId, 'global', 'src');
        let updated_src = {...src};
        let walk;

        //deep copy of src variable
        for (const idx of namespace) {
            if (Array.isArray(src[idx])) {
                updated_src[idx] = [...src[idx]];
            } else {
                updated_src[idx] = {...src[idx]};
            }
        }

        //point at current index
        walk = updated_src;
        for (const idx of namespace) {
            walk = walk[idx];
        }

        if (variable_removed) {
            if (toType(walk) == 'array') {
                walk.splice(name, 1);
            } else {
                delete walk[name];
            }
        } else {
            //update copied variable at specified namespace
            if (name !== null) {
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
}

const attributeStore = new ObjectAttributes;
dispatcher.register(attributeStore.handleAction.bind(attributeStore));
export default attributeStore;
