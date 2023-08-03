//returns a string "type" of input object
export function toType(obj) {
    let type = getType(obj);
    // some extra disambiguation for numbers
    if (type === 'number') {
        if (isNaN(obj)) {
            type = 'nan';
        } else if ((obj | 0) != obj) {
            //bitwise OR produces integers
            type = 'float';
        } else {
            type = 'integer';
        }
    }
    return type;
}

//source: http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390612#7390612
function getType(obj) {
    return {}.toString
        .call(obj)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase();
}

//validation for base-16 themes
export function isTheme(theme) {
    const theme_keys = [
        'base00',
        'base01',
        'base02',
        'base03',
        'base04',
        'base05',
        'base06',
        'base07',
        'base08',
        'base09',
        'base0A',
        'base0B',
        'base0C',
        'base0D',
        'base0E',
        'base0F'
    ];
    if (toType(theme) === 'object') {
        for (var i = 0; i < theme_keys.length; i++) {
            if (!(theme_keys[i] in theme)) {
                return false;
            }
        }
        return true;
    }
    return false;
}


export function searchJson(json, searchTerm, levelPath = 'root')  {
    const paths = [];

    if (!searchTerm) {
        return paths;
    }

    const normalized = searchTerm.toLowerCase();
    for (const jsonElement of Object.keys(json).sort()) {
        const path = `${levelPath}.${jsonElement}`;
        if (typeof json[jsonElement] === 'string' && json[jsonElement].toLowerCase().includes(normalized)) {
            paths.push(path);
        } else if (
            (typeof json[jsonElement] === 'number' ||
                typeof json[jsonElement] === 'boolean' ||
                json[jsonElement] === null ||
                json[jsonElement] === undefined) &&
            String(json[jsonElement]).includes(normalized)
        ) {
            paths.push(path);
        } else if (typeof json[jsonElement] === 'object' && !(json[jsonElement] === null)) {
            const result = searchJson(json[jsonElement], normalized, path);
            if (result.length) {
                paths.push(...result);
            }
        }
    }
    return paths;
}

export const jsonFlatPaths = (json, levelPath = 'root') => {
    const paths = [];

    for (const jsonElement in json) {
        const path = `${levelPath}.${jsonElement}`;
        if (typeof json[jsonElement] === 'object' && !(json[jsonElement] === null)) {
            const result = jsonFlatPaths(json[jsonElement], path);
            if (result.length) {
                paths.push(...result);
            }
        } else {
            paths.push(path);
        }
    }

    return paths;
};


// source: https://codeburst.io/throttling-and-debouncing-in-javascript-646d076d0a44
export function debounced(fn, delay) {
    let timerId;
    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    }
}
