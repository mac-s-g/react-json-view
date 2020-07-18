import React from "react";
import Theme from "./../themes/getStyle";
import { toType } from "../helpers/util";

export default function getObjectName(props) {
  const {
    parent_type,
    namespace,
    theme,
    jsvRoot,
    name,
    src,
    storeResponsePathData,
  } = props;

  const dotNotationNamespace = namespace.join(".");

  let variable;
  let keys = Object.keys(src || {});

  keys.forEach((name) => {
    variable = new JsonVariable(name, src[name]);

    if (!src.hasOwnProperty(name)) {
      return;
    }
  });
  let highlight;
  if (storeResponsePathData) {
    storeResponsePathData.forEach((store) => {
      if (store.storeResponsePath === dotNotationNamespace) highlight = true;
    });
  }

  const display_name = props.name ? props.name : "";
  if (jsvRoot && (name === false || name === null)) {
    return <span />;
  } else if (parent_type == "array") {
    return (
      <span {...Theme(theme, "array-key")} key={namespace}>
        <span
          class={highlight ? "highlight array-key" : "array-key"}
          id={dotNotationNamespace}
        >
          {display_name}
        </span>
        <span {...Theme(theme, "colon")}>:</span>
      </span>
    );
  } else {
    return (
      <span {...Theme(theme, "object-name")} key={namespace}>
        <span class="object-key">
          <span style={{ verticalAlign: "top" }}>"</span>
          <span className={highlight && "highlight"} id={dotNotationNamespace}>
            {display_name}
          </span>
          <span style={{ verticalAlign: "top" }}>"</span>
        </span>
        <span {...Theme(theme, "colon")}>:</span>
      </span>
    );
  }
}
//just store name, value and type with a variable
class JsonVariable {
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this.type = toType(value);
  }
}
