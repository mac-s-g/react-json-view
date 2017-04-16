//store persistent config options
class ConfigStore {

    store = {}

    set = (key, value) => {
        this.store[key] = value;
    }

    get = (key, default_value) => {
        if (this.store[key] === undefined) {
            return default_value;
        }
        return this.store[key];
    }
}

const configStore = new ConfigStore;

export default configStore;
