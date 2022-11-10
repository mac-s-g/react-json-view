import { useContext } from "react";

import { DISPLAY_BRACES } from "../helpers/util";
import Theme from "../themes/getStyle";
import LocalJsonViewContext from "./LocalJsonViewContext";
import ReactJsonViewContext from "./ReactJsonViewContext";

const ObjectName = () => {
  const {
    props: { theme, quotesOnKeys, displayArrayKey },
  } = useContext(ReactJsonViewContext);

  const { depth, namespace, parentType } = useContext(LocalJsonViewContext);
  const isRoot = depth === 0;
  const name = namespace[namespace.length - 1];

  if (isRoot && name === null) {
    return <span />;
  }

  if (parentType === "array") {
    return displayArrayKey ? (
      <span {...Theme(theme, "array-key")}>
        <span className="array-key">{name}</span>
        <span {...Theme(theme, "colon")}>:</span>
      </span>
    ) : (
      <span />
    );
  }

  return (
    <span {...Theme(theme, "object-name")}>
      <span className="object-key">
        {quotesOnKeys && (
          <span style={{ verticalAlign: "top" }}>
            {DISPLAY_BRACES.doubleQuotes.start}
          </span>
        )}
        <span>{name}</span>
        {quotesOnKeys && (
          <span style={{ verticalAlign: "top" }}>
            {DISPLAY_BRACES.doubleQuotes.end}
          </span>
        )}
      </span>
      <span {...Theme(theme, "colon")}>:</span>
    </span>
  );
};

export default ObjectName;
