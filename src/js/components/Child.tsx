import { useContext } from "react";

import { SINGLE_INDENT, toType } from "../helpers/util";
import { JsonObject } from "./DataTypes";
import LocalJsonViewContext from "./LocalJsonViewContext";
import ReactJsonViewContext, { Json } from "./ReactJsonViewContext";
import VariableEditor from "./VariableEditor";

const Child = ({
  depth,
  namespace,
  value,
}: {
  depth: number;
  namespace: (string | null)[];
  value: Json;
}) => {
  const type = toType(value);

  const {
    props: { groupArraysAfterLength },
  } = useContext(ReactJsonViewContext);

  return (
    <LocalJsonViewContext.Provider
      value={{
        depth,
        namespace,
        type,
        value,
      }}
    >
      {type === "object" ? (
        <JsonObject
          objectType="object"
          indexOffset={0}
          parentIsArrayGroup={false}
        />
      ) : type === "array" &&
        (value as Json[]).length <= groupArraysAfterLength ? (
        <JsonObject
          objectType="array"
          indexOffset={0}
          parentIsArrayGroup={false}
        />
      ) : type === "array" ? (
        <ArrayGroup />
      ) : (
        <VariableEditor
          variable={variable}
          singleIndent={SINGLE_INDENT}
          namespace={namespace}
          type={type}
        />
      )}
    </LocalJsonViewContext.Provider>
  );
};

export default Child;
