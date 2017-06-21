export default function parseInput(input) {

    //following code is to make a best guess at
    //the type for a variable being submitted.

    //we are working with a serialized data representation
    input = input.trim();
    try {
        input = JSON.stringify(
            JSON.parse(input)
        );
        if (input[0] == '[') {
            return (formatResponse('array', input));
        } else if (input[0] == '{') {
            return (formatResponse('object', input));
        }

        input = input.toLowerCase();

        if (input == 'null') {
            return (formatResponse('null', 'null'));
        } else if (input == 'true') {
            return (formatResponse('boolean', 'true'));
        } else if (input == 'false') {
            return (formatResponse('boolean', 'false'));
        } else if (
            input.match(/\d+\.\d+/)
            && input.match(/\d+\.\d+/)[0] == input
        ) {
            return (formatResponse('float', parseFloat(input)));
        } else if (
            input.match(/\d+/)
            && input.match(/\d+/)[0] == input
        ) {
            return (formatResponse('integer', parseInt(input)));
        }
    } catch (e) {
        //run in case input was not serializable
        input = input.toLowerCase();
        switch (input) {
            case 'undefined': {
                return (formatResponse('undefined', 'undefined'));
                break;
            }
            case 'nan': {
                return (formatResponse('NaN', 'false'));
                break;
            }
            default: {
                //check to see if this is a date
                input = Date.parse(input);
                if (input) {
                    return (formatResponse('date', input));
                }
            }
        }
    }

    return formatResponse(false, null);

};

function formatResponse(type, value) {
    return {
        type: type,
        value: value
    }
}