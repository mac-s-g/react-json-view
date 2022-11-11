import { Json } from "../components/ReactJsonViewContext";

const getClipboardValue = (value: Json) => {
  return JSON.stringify(value);
};
export default getClipboardValue;
