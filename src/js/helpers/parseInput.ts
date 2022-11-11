import { Json, TypeName } from "../components/ReactJsonViewContext";

export default function parseInput(originalInput: string) {
  // following code is to make a best guess at
  // the type for a variable being submitted.

  // we are working with a serialized data representation
  let input = originalInput.trim();
  try {
    input = JSON.stringify(JSON.parse(input));
    if (input[0] === "[") {
      // array
      return formatResponse("array", JSON.parse(input));
    }
    if (input[0] === "{") {
      // object
      return formatResponse("object", JSON.parse(input));
    }
    if (input.match(/-?\d+\.\d+/) && input.match(/-?\d+\.\d+/)![0] === input) {
      // float
      return formatResponse("number", parseFloat(input));
    }
    if (input.match(/-?\d+e-\d+/) && input.match(/-?\d+e-\d+/)![0] === input) {
      // scientific float
      return formatResponse("number", Number(input));
    }
    if (input.match(/-?\d+/) && input.match(/-?\d+/)![0] === input) {
      // integer
      return formatResponse("number", parseInt(input));
    }
    if (
      input.match(/-?\d+e\+\d+/) &&
      input.match(/-?\d+e\+\d+/)![0] === input
    ) {
      // scientific integer
      return formatResponse("number", Number(input));
    }
  } catch (e) {
    // no-op
  }

  // run in case input was not serializable
  input = input.toLowerCase();
  switch (input) {
    case "null": {
      return formatResponse("null", null);
    }
    case "true": {
      return formatResponse("boolean", true);
    }
    case "false": {
      return formatResponse("boolean", false);
    }
    default: {
      return formatResponse("string", originalInput);
    }
  }
}

function formatResponse(type: TypeName, value: Json) {
  return {
    type,
    value,
  };
}
