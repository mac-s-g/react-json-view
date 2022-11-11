import { useContext, useMemo } from "react";

import { toType } from "../helpers/util";
import ArrayGroup from "./ArrayGroup";
import JsonObject from "./DataTypes/Object";
import LocalJsonViewContext from "./LocalJsonViewContext";
import ReactJsonViewContext from "./ReactJsonViewContext";

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

  const type = toType(rjvProps.value);

  return (
    <LocalJsonViewContext.Provider
      value={{
        namespace,
        type,
        value: rjvProps.value,
        depth: 0,
        parentType: "object",
      }}
    >
      <div className="pretty-json-container object-container">
        <div className="object-content">
          <ObjectComponent
            indexOffset={0}
            objectType={type as "array" | "object"}
            parentIsArrayGroup={false}
          />
        </div>
      </div>
    </LocalJsonViewContext.Provider>
  );
};

export default JsonViewer;
