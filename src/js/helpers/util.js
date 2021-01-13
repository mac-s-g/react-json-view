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
    if (isColor(obj)) {
        return 'color';
    }
    return {}.toString
        .call(obj)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase();
}

function isColor(strColor) {
    let s = new Option().style;
    s.color = strColor;
    let checkColor = s.color === strColor;
    let checkRGB = /^(rgb)\(([0-29]{1,3},?){3}\)$/i.test(strColor);
    let checkRGBA = /^(rgba)\(([0-9]{1,3},?\s?){3}(\d?\.?(\d{1,2})?)\)$/i.test(strColor);
    let checkHex = /^#(?:[A-Fa-f0-9]{3}){1,2}$/i.test(strColor);
    // let checkHSL = /^hsl[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*[)]$/i.test(strColor);
    // let checkHSLA = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/i.test(strColor);
    return checkColor === true
        || checkRGB === true
        || checkRGBA === true
        || checkHex === true;
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
