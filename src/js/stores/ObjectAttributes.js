//store persistent display attributes for objects and arrays
class ObjectAttributes {

    objects = {}

    set = (name, key, value) => {
        if (this.objects[name] === undefined) {
            this.objects[name] = {};
        }
        this.objects[name][key] = value;
    }

    get = (name, key, default_value) => {
        if (this.objects[name] === undefined
            || this.objects[name][key] == undefined
        ) {
            this.set(name, key, default_value);
        }
        return this.objects[name][key];
    }
}

const attributeStore = new ObjectAttributes;

export default attributeStore;
