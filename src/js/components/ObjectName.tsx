import { useContext, useState } from "react";

import { DISPLAY_BRACES } from "../helpers/util";
import Theme from "../themes/getStyle";
import { EditKeyIcon } from "./DataTypes/Object";
import LocalJsonViewContext from "./LocalJsonViewContext";
import ReactJsonViewContext from "./ReactJsonViewContext";

const ObjectName = () => {
  const {
    props: { theme, quotesOnKeys, displayArrayKey },
  } = useContext(ReactJsonViewContext);
  const [hovered, setHovered] = useState(false);

  const { depth, namespace, parentType } = useContext(LocalJsonViewContext);
  const isRoot = depth === 0;
  const name = namespace.at(-1);

  if (isRoot && name === null) {
    return <span />;
  }

  if (parentType === "array") {
    return displayArrayKey ? (
      <span
        {...Theme(theme, "array-key")}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="array-key">{name}</span>
        <EditKeyIcon rowHovered={hovered} />
        <span {...Theme(theme, "colon")}>:</span>
      </span>
    ) : (
      <span />
    );
  }

  return (
    <span
      {...Theme(theme, "object-name")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
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
      <EditKeyIcon rowHovered={hovered} />
      <span {...Theme(theme, "colon")}>:</span>
    </span>
  );
};

export default ObjectName;
