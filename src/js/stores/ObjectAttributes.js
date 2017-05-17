//store persistent display attributes for objects and arrays
class ObjectAttributes {

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
}

const attributeStore = new ObjectAttributes;

export default attributeStore;
