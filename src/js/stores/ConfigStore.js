//store persistent config options
class ConfigStore {

    store = {}

    set = (id, key, value) => {
        if (this.store[id] === undefined) {
            this.store[id] = {};
        }
        this.store[id][key] = value;
    }

    get = (id, key, default_value) => {
        if (this.store[id] === undefined) {
            this.store[id] = {};
        }
        if (this.store[id][key] === undefined) {
            return default_value;
        }
        return this.store[id][key];
    }
}

const configStore = new ConfigStore;

export default configStore;
