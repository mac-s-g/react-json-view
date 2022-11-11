/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from "react";

import { toType } from "../helpers/util";
import Theme from "../themes/getStyle";
import CopyToClipboard from "./CopyToClipboard";
import { AddCircle as Add, RemoveCircle as Remove } from "./icons";
import LocalJsonViewContext from "./LocalJsonViewContext";
import ReactJsonViewContext from "./ReactJsonViewContext";

const RemoveObject = ({ rowHovered }: { rowHovered: boolean }) => {
  const {
    props: { theme },
  } = useContext(ReactJsonViewContext);
  const { namespace } = useContext(LocalJsonViewContext);

  const name = namespace.at(-1);

  // don't allow deleting of root node
  if (namespace.length === 1) {
    return <></>;
  }
  return (
    <span
      className="click-to-remove"
      style={{
        display: rowHovered ? "inline-block" : "none",
      }}
    >
      <Remove
        className="click-to-remove-icon"
        {...Theme(theme, "removeVarIcon")}
        onClick={() => {
          // TODO: WRITE CODE TO REMOVE THE OBJECT
        }}
      />
    </span>
  );
};

const AddAttribute = ({ rowHovered }: { rowHovered: boolean }) => {
  const { namespace, value, depth } = useContext(LocalJsonViewContext);
  const {
    props: { theme },
    rjvId,
  } = useContext(ReactJsonViewContext);

  const name = namespace.at(-1);
  return (
    <span
      className="click-to-add"
      style={{
        verticalAlign: "top",
        display: rowHovered ? "inline-block" : "none",
      }}
    >
      <Add
        className="click-to-add-icon"
        {...Theme(theme, "addVarIcon")}
        onClick={() => {
          const request = {
            name: depth > 0 ? name : null,
            namespace: namespace.splice(0, namespace.length - 1),
            existing_value: value,
            variable_removed: false,
            key_name: null,
          };
          // TODO: Add logic to actually add the item whether it's an object or array
        }}
      />
    </span>
  );
};

const ObjectMeta = ({ rowHovered }: { rowHovered: boolean }) => {
  const {
    props: { theme, enableClipboard, canEdit, canDelete, canAdd },
  } = useContext(ReactJsonViewContext);

  const { value } = useContext(LocalJsonViewContext);

  const size = Object.keys(value as typeof value & object).length;

  return (
    <div
      type="button"
      {...Theme(theme, "object-meta-data")}
      className="object-meta-data"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* size badge display */}
      <span className="object-size" {...Theme(theme, "object-size")}>
        {size} item{size === 1 ? "" : "s"}
      </span>
      {/* copy to clipboard icon */}
      {enableClipboard ? <CopyToClipboard rowHovered={rowHovered} /> : null}
      {/* copy add/remove icons */}
      {canAdd ? <AddAttribute rowHovered={rowHovered} /> : null}
      {canDelete ? <RemoveObject rowHovered={rowHovered} /> : null}
    </div>
  );
};

export default ObjectMeta;
