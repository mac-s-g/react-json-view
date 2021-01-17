export default function parseInput(input) {
    //following code is to make a best guess at
    //the type for a variable being submitted.

    //we are working with a serialized data representation
    input = input.trim();
    try {
        input = JSON.stringify(JSON.parse(input));
        if (input[0] === '[') {
            //array
            return formatResponse('array', JSON.parse(input));
        } else if (input[0] === '{') {
            //object
            return formatResponse('object', JSON.parse(input));
        } else if (
            input.match(/\-?\d+\.\d+/) &&
            input.match(/\-?\d+\.\d+/)[0] === input
        ) {
            //float
            return formatResponse('float', parseFloat(input));
        } else if (
            input.match(/\-?\d+e-\d+/) &&
            input.match(/\-?\d+e-\d+/)[0] === input
        ) {
            //scientific float
            return formatResponse('float', Number(input));
        } else if (
            input.match(/\-?\d+/) &&
            input.match(/\-?\d+/)[0] === input
        ) {
            //integer
            return formatResponse('integer', parseInt(input));
        } else if (
            input.match(/\-?\d+e\+\d+/) &&
            input.match(/\-?\d+e\+\d+/)[0] === input
        ) {
            //scientific integer
            return formatResponse('integer', Number(input));
        }
    } catch (e) {
        // no-op
    }

    //run in case input was not serializable
    input = input.toLowerCase();
    switch (input) {
        case 'undefined': {
            return formatResponse('undefined', undefined);
        }
        case 'nan': {
            return formatResponse('nan', NaN);
        }
        case 'null': {
            return formatResponse('null', null);
        }
        case 'true': {
            return formatResponse('boolean', true);
        }
        case 'false': {
            return formatResponse('boolean', false);
        }
        default: {
            //check to see if this is a date
            input = Date.parse(input);
            if (input) {
                return formatResponse('date', new Date(input));
            }
        }
    }

    return formatResponse(false, null);
}

function formatResponse(type, value) {
    return {
        type: type,
        value: value
    };
}
