import { useContext, useState } from "react";

import { DISPLAY_BRACES } from "../../helpers/util";
import Theme from "../../themes/getStyle";
import LocalJsonViewContext from "../LocalJsonViewContext";
import ReactJsonViewContext from "../ReactJsonViewContext";
import DataTypeLabel from "./DataTypeLabel";

const StringDataType = ({ dataValue }: { dataValue?: string }) => {
  const typeName = "string";
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const {
    props: { collapseStringsAfterLength, theme },
  } = useContext(ReactJsonViewContext);
  const { value } = useContext(LocalJsonViewContext);
  const style = {
    style: {
      cursor: "default",
      border: "none",
      backgroundColor: "transparent",
      ...Theme(theme, "string").style,
    },
  };

  const collapsable = value
    ? (value as string).length > collapseStringsAfterLength
    : false;

  if (collapsable) {
    style.style.cursor = "pointer";
  }

  return (
    <div {...Theme(theme, "string")}>
      <DataTypeLabel typeName="string" />
      <button
        type="button"
        className="string-value"
        {...style}
        onClick={toggleCollapsed}
      >
        <>
          {DISPLAY_BRACES.doubleQuotes.start}
          {collapsable && collapsed ? (
            <span>
              {(value as string).substring(0, collapseStringsAfterLength)}
              <span {...Theme(theme, "ellipsis")}> ...</span>
            </span>
          ) : (
            dataValue ?? value
          )}
          {DISPLAY_BRACES.doubleQuotes.end}
        </>
      </button>
    </div>
  );
};

export default StringDataType;
