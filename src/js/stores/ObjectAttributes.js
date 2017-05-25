import {EventEmitter} from "events";
import dispatcher from './../helpers/dispatcher';

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
        switch (action.name) {
            case 'VARIABLE_UPDATED':
                this.set(
                    action.rjvId,
                    'action',
                    'variable-update',
                    action.data
                );
                this.emit('variable-update-' + action.rjvId)
                break;
        }
    }
}

const attributeStore = new ObjectAttributes;
dispatcher.register(attributeStore.handleAction.bind(attributeStore));
export default attributeStore;
