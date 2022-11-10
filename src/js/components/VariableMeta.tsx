import React, { useContext } from "react";

import { toType } from "../helpers/util";
import Theme from "../themes/getStyle";
import CopyToClipboard from "./CopyToClipboard";
import { AddCircle as Add, RemoveCircle as Remove } from "./icons";
import LocalJsonViewContext from "./LocalJsonViewContext";
import ReactJsonViewContext from "./ReactJsonViewContext";

export default class extends React.PureComponent {
  getAddAttribute = (rowHovered) => {
    const { namespace, name, value, depth } = useContext(LocalJsonViewContext);
    const {
      props: { theme },
      rjvId,
    } = useContext(ReactJsonViewContext);

    return (
      <span
        className="click-to-add"
        style={{
          verticalAlign: "top",
          display: rowHovered ? "inline-block" : "none",
        }}
      >
        <Add
          class="click-to-add-icon"
          {...Theme(theme, "addVarIcon")}
          onClick={() => {
            const request = {
              name: depth > 0 ? name : null,
              namespace: namespace.splice(0, namespace.length - 1),
              existing_value: src,
              variable_removed: false,
              key_name: null,
            };
            if (toType(src) === "object") {
              dispatcher.dispatch({
                name: "ADD_VARIABLE_KEY_REQUEST",
                rjvId,
                data: request,
              });
            } else {
              dispatcher.dispatch({
                name: "VARIABLE_ADDED",
                rjvId,
                data: {
                  ...request,
                  new_value: [...src, null],
                },
              });
            }
          }}
        />
      </span>
    );
  };

  getRemoveObject = (rowHovered) => {
    const { theme, hover, namespace, name, src, rjvId } = this.props;

    // don't allow deleting of root node
    if (namespace.length === 1) {
      return;
    }
    return (
      <span
        className="click-to-remove"
        style={{
          display: rowHovered ? "inline-block" : "none",
        }}
      >
        <Remove
          class="click-to-remove-icon"
          {...Theme(theme, "removeVarIcon")}
          onClick={() => {
            dispatcher.dispatch({
              name: "VARIABLE_REMOVED",
              rjvId,
              data: {
                name,
                namespace: namespace.splice(0, namespace.length - 1),
                existing_value: src,
                variable_removed: true,
              },
            });
          }}
        />
      </span>
    );
  };
}

const VariableMeta = ({ rowHovered }) => {
  const { props: rjvProps } = useContext(ReactJsonViewContext);

  return (
    <button
      type="button"
      {...Theme(rjvProps.theme, "object-meta-data")}
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
      {rjvProps.enableClipboard ? (
        <CopyToClipboard
          rowHovered={rowHovered}
          clickCallback={enableClipboard}
        />
      ) : null}
      {/* copy add/remove icons */}
      {rjvProps.canAdd !== false ? this.getAddAttribute(rowHovered) : null}
      {rjvProps.onDelete !== false ? this.getRemoveObject(rowHovered) : null}
    </button>
  );
};
