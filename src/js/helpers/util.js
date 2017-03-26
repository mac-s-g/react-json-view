//returns a string "type" of input object
//source: http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390612#7390612 
export function toType(obj) {
    let type = getType(obj);
    if (type == 'number') {
        if (isNaN(obj)) {
            type = 'nan';
        }
    }
    return type;
}

function getType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}