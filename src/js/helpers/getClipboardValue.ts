import { toType } from "./util";

const getClipboardValue = (value: unknown) => {
  const type = toType(value);
  switch (type) {
    case "function":
    case "regexp":
      return (value as {}).toString();
    default:
      return value;
  }
};
export default getClipboardValue;