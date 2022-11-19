import { useContext, useState } from "react";

import {
  DEPTH_INCREMENT,
  DISPLAY_BRACES,
  SINGLE_INDENT,
  toType,
} from "../../helpers/util";
import Theme from "../../themes/getStyle";
import Child from "../Child";
import LocalJsonViewContext from "../LocalJsonViewContext";
import ObjectMeta from "../ObjectMeta";
import ObjectName from "../ObjectName";
import ReactJsonViewContext, { Json } from "../ReactJsonViewContext";
import { CollapsedIcon, ExpandedIcon } from "../ToggleIcons";

const Ellipsis = ({
  size,
  onToggleCollapsed,
}: {
  size: number;
  onToggleCollapsed: () => void;
}) => {
  const {
    props: { theme },
  } = useContext(ReactJsonViewContext);
  if (size === 0) {
    // don't render an ellipsis when an object has no items
    return <></>;
  }
  return (
    <button
      {...Theme(theme, "ellipsis")}
      className="node-ellipsis"
      onClick={onToggleCollapsed}
      type="button"
    >
      ...
    </button>
  );
};

const StartBrace = ({
  objectType,
  collapsed,
  hovered,
  toggleCollapsed,
  parentIsArrayGroup,
}: {
  objectType: "array" | "object";
  collapsed: boolean;
  hovered: boolean;
  size: number;
  toggleCollapsed: () => void;
  parentIsArrayGroup: boolean;
}) => {
  const {
    props: { theme },
  } = useContext(ReactJsonViewContext);

  const braceString = DISPLAY_BRACES[objectType].start;

  if (parentIsArrayGroup) {
    return (
      <span>
        <span {...Theme(theme, "brace")}>{braceString}</span>
        {collapsed ? <></> : <ObjectMeta rowHovered={hovered} />}
      </span>
    );
  }

  const IconComponent = collapsed ? CollapsedIcon : ExpandedIcon;

  return (
    <span>
      <button
        type="button"
        onClick={(e) => {
          toggleCollapsed();
        }}
        {...Theme(theme, "brace-row")}
      >
        <div className="icon-container" {...Theme(theme, "icon-container")}>
          <IconComponent />
        </div>
        <ObjectName />
        <span {...Theme(theme, "brace")}>{braceString}</span>
      </button>

      {collapsed ? <></> : <ObjectMeta rowHovered={hovered} />}
    </span>
  );
};

const ObjectDataTypeContents = ({
  indexOffset,
  objectType,
  parentIsArrayGroup,
}: {
  objectType: "array" | "object";
  parentIsArrayGroup: boolean;
  indexOffset: number;
}) => {
  const { depth, namespace, value } = useContext(LocalJsonViewContext);
  const {
    props: { sortKeys, theme },
  } = useContext(ReactJsonViewContext);

  const baseKeys = Object.keys(value as typeof value & object);
  const shouldSort = sortKeys && objectType !== "array";
  const actualKeys = shouldSort ? baseKeys.sort() : baseKeys;
  const type = toType(value);

  return (
    <div className="pushed-content object-container">
      <div className="object-content" {...Theme(theme, "pushed-content")}>
        {actualKeys.map((key) => (
          <Child
            depth={depth + DEPTH_INCREMENT}
            namespace={namespace.concat(
              parentIsArrayGroup ? `${parseInt(key) + indexOffset}` : key,
            )}
            value={(value as any)[key] as Json}
            key={`${key}-${namespace}`}
            parentType={type}
          />
        ))}
      </div>
    </div>
  );
};

const EndBrace = ({
  objectType,
  collapsed,
}: {
  objectType: "object" | "array";
  collapsed: boolean;
}) => {
  const {
    props: { theme },
  } = useContext(ReactJsonViewContext);

  return (
    <span
      style={{
        ...Theme(theme, "brace").style,
        paddingLeft: collapsed ? "0px" : "3px",
      }}
    >
      {DISPLAY_BRACES[objectType].end}
    </span>
  );
};

// TODO: Remove the any
const ObjectDataType = ({
  parentIsArrayGroup,
  objectType,
  indexOffset,
}: {
  objectType: "object" | "array";
  parentIsArrayGroup: boolean;
  indexOffset: number;
}) => {
  const {
    props: { indentWidth, shouldCollapse, theme },
  } = useContext(ReactJsonViewContext);
  const { depth, value } = useContext(LocalJsonViewContext);
  const isRoot = depth === 0;

  const [hovered, setHovered] = useState(false);
  const [collapsed, setCollapsed] = useState(() =>
    shouldCollapse({ depth, value }),
  );

  /* <old> */
  const styles = {} as any;
  if (!isRoot && !parentIsArrayGroup) {
    styles.paddingLeft = indentWidth * SINGLE_INDENT;
  } else if (parentIsArrayGroup) {
    styles.borderLeft = 0;
    styles.display = "inline";
  }
  /* </old> */

  const size = Object.keys(value as typeof value & object).length;

  return (
    <div
      className="object-key-val"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...Theme(theme, isRoot ? "jsv-root" : "objectKeyVal", styles)}
    >
      <StartBrace
        objectType={objectType}
        collapsed={collapsed}
        hovered={hovered}
        parentIsArrayGroup={parentIsArrayGroup}
        size={size}
        toggleCollapsed={() => setCollapsed(!collapsed)}
      />

      {collapsed ? (
        <Ellipsis
          onToggleCollapsed={() => setCollapsed(!collapsed)}
          size={size}
        />
      ) : (
        <ObjectDataTypeContents
          objectType={objectType}
          indexOffset={indexOffset}
          parentIsArrayGroup={parentIsArrayGroup}
        />
      )}

      <span className="brace-row">
        <EndBrace collapsed={collapsed} objectType={objectType} />

        {collapsed ? <ObjectMeta rowHovered={hovered} /> : <></>}
      </span>
    </div>
  );
};

export default ObjectDataType;
