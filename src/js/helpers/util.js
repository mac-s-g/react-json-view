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
    let type = {}.toString
        .call(obj)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase();
    if (type === 'string' && isColor(obj)) {
        type = 'color';
    }
    return type;
}

function isColor(strColor) {
    let isHex = /^#(?:[A-Fa-f0-9]{3}){1,2}$/i.test(strColor);
    let isRGB = /^(rgb)\(([0-9]{1,3},?\s?){3}\)$/i.test(strColor);
    let isRGBA = /^(rgba)\(([0-9]{1,3},?\s?){3}(\d?\.?(\d{1,2})?)\)$/i.test(
        strColor
    );
    let isHSL = /^hsl[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*[)]$/i.test(
        strColor
    );
    let isHSLA = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/i.test(
        strColor
    );
    return isHex || isRGB || isRGBA || isHSL || isHSLA;
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

export function parseExternalClipboardData(type, value) {
    switch (type) {
        case 'isArray':
        case 'isObject': {
            try {
                return JSON.parse(value);
            } catch (e) {
                return e;
            }
        }
        case 'isFloat':
            return parseFloat(value);
        case 'isInteger':
            return parseInt(value);
        case 'isString':
            return value.substring(1, value.length - 1);
    }
    //if value is undefined, null, true or false (special types)
    let customTypes = value.toLowerCase();
    switch (customTypes) {
        case 'undefined': {
            return undefined;
        }
        case 'null': {
            return null;
        }
        case 'true': {
            return true;
        }
        case 'false': {
            return false;
        }
    }
    //return as string
    return value;
}

export function getExternalClipboardDataType(value) {
    value = value.trim();
    value = value.replaceAll("'", '"');
    const isArray = value[0] === '[' && value[value.length - 1] === ']';
    const isObject = value[0] === '{' && value[value.length - 1] === '}';
    const isFloat =
        value.match(/\-?\d+\.\d+/) && value.match(/\-?\d+\.\d+/)[0] === value;
    const isInteger =
        value.match(/\-?\d+/) && value.match(/\-?\d+/)[0] === value;
    const isString = value[0] === '"' && value[value.length - 1] === '"';

    if (isArray) return 'isArray';
    if (isObject) return 'isObject';
    if (isFloat) return 'isFloat';
    if (isInteger) return 'isInteger';
    if (isString) return 'isString';
}

export function insertToObject({
    existing_value,
    dropTargetIdx,
    input,
    pasteValue
}) {
    let newSrc = {};
    Object.keys(existing_value).forEach((key, idx) => {
        newSrc[key] = existing_value[key];
        //insert after
        if (idx + 1 === dropTargetIdx + 1) {
            newSrc[input] = pasteValue;
        }
    });
    return newSrc;
}

export function insertToArray({ existing_value, dropTargetIdx, pasteValue }) {
    const new_value = [
        ...existing_value.slice(0, dropTargetIdx + 1),
        pasteValue,
        ...existing_value.slice(dropTargetIdx + 1)
    ];
    return new_value;
}
