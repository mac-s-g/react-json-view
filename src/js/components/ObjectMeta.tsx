/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from "react";

import { toType } from "../helpers/util";
import attributeStore from "../stores/ObjectAttributes";
import Theme from "../themes/getStyle";
import CopyToClipboard from "./CopyToClipboard";
import { AddCircle as Add, RemoveCircle as Remove } from "./icons";
import LocalJsonViewContext from "./LocalJsonViewContext";
import ReactJsonViewContext, { Json } from "./ReactJsonViewContext";

const RemoveObject = ({ rowHovered }: { rowHovered: boolean }) => {
  const {
    props: { theme },
    rjvId,
  } = useContext(ReactJsonViewContext);
  const { namespace, value } = useContext(LocalJsonViewContext);

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
          const data = {
            name,
            namespace: namespace.splice(0, namespace.length - 1),
            existingValue: value,
            variableRemoved: true,
          };
          attributeStore.handleAction({
            name: "VARIABLE_REMOVED",
            rjvId,
            data,
          });
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
            existingValue: value,
            variableRemoved: false,
            keyName: null,
          };

          if (toType(value) === "object") {
            attributeStore.handleAction({
              name: "ADD_VARIABLE_KEY_REQUEST",
              rjvId,
              data: request,
            });
          } else {
            attributeStore.handleAction({
              name: "VARIABLE_ADDED",
              rjvId,
              data: {
                ...request,
                newValue: [...(value as Json[]), null],
              },
            });
          }
        }}
      />
    </span>
  );
};

const ObjectMeta = ({ rowHovered }: { rowHovered: boolean }) => {
  const {
    props: { theme, enableClipboard, canDelete, canAdd, displayObjectSize },
  } = useContext(ReactJsonViewContext);

  const { value, subArray } = useContext(LocalJsonViewContext);
  const displayValue = subArray ?? value;
  const size = Object.keys(displayValue as typeof displayValue & object).length;

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
        {displayObjectSize ? `${size} item${size === 1 ? "" : "s"}` : null}
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
