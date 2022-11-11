import { useContext } from "react";

import { SINGLE_INDENT, toType } from "../helpers/util";
import ArrayGroup from "./ArrayGroup";
import { JsonObject } from "./DataTypes";
import LocalJsonViewContext from "./LocalJsonViewContext";
import ReactJsonViewContext, { Json, TypeName } from "./ReactJsonViewContext";
import VariableEditor from "./VariableEditor";

const Child = ({
  depth,
  namespace,
  value,
  parentType,
}: {
  depth: number;
  namespace: (string | null)[];
  value: Json;
  parentType: TypeName;
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
        parentType,
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
