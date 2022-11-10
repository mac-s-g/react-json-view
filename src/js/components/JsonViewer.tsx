import { useContext, useMemo } from "react";

import { toType } from "../helpers/util";
import ArrayGroup from "./ArrayGroup";
import JsonObject from "./DataTypes/Object";
import LocalJsonViewContext from "./LocalJsonViewContext";
import ReactJsonViewContext, { Json } from "./ReactJsonViewContext";

type JsonViewerProps = object;
const JsonViewer = (p: JsonViewerProps) => {
  const { props: rjvProps } = useContext(ReactJsonViewContext);
  const ObjectComponent = useMemo(() => {
    if (
      Array.isArray(rjvProps.value) &&
      rjvProps.groupArraysAfterLength &&
      (rjvProps.value as Array<unknown>).length >
        rjvProps.groupArraysAfterLength
    ) {
      return ArrayGroup;
    }
    return JsonObject;
  }, []);

  const namespace = [rjvProps.rootNodeName];

  return (
    <LocalJsonViewContext.Provider
      value={{
        namespace,
        type: toType(rjvProps.value),
        value: rjvProps.value,
      }}
    >
      <div className="pretty-json-container object-container">
        <div className="object-content">
          <ObjectComponent namespace={namespace} depth={0} jsvRoot />
        </div>
      </div>
    </LocalJsonViewContext.Provider>
  );
};

export default JsonViewer;
