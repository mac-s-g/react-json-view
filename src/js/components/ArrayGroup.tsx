/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useId, useState } from "react";

import { SINGLE_INDENT } from "../helpers/util";
import Theme from "../themes/getStyle";
import { JsonObject } from "./DataTypes";
import LocalJsonViewContext from "./LocalJsonViewContext";
import ObjectMeta from "./ObjectMeta";
import ObjectName from "./ObjectName";
import ReactJsonViewContext, { Json } from "./ReactJsonViewContext";
import { CollapsedIcon, ExpandedIcon } from "./ToggleIcons";

const ArrayGroup = () => {
  const uniqueId = useId();
  const { namespace, value, depth } = useContext(LocalJsonViewContext);
  const {
    props: { theme, groupArraysAfterLength, indentWidth },
  } = useContext(ReactJsonViewContext);

  const [collapsed, setCollapsed] = useState<{
    [key: number]: boolean | undefined;
  }>({});

  const toggleCollapsed = (i: number) => {
    setCollapsed({
      ...collapsed,
      [i]: collapsed[i] === undefined ? true : !collapsed[i],
    });
  };

  const isRoot = depth === 0;

  const arrayGroupPaddingLeft = indentWidth * SINGLE_INDENT;
  const objectPaddingLeft = isRoot ? 0 : indentWidth * SINGLE_INDENT;

  const size = groupArraysAfterLength;
  const numGroups = Math.ceil((value as Json[]).length / size);

  return (
    <div
      className="object-key-val"
      {...Theme(theme, isRoot ? "jsv-root" : "objectKeyVal", {
        paddingLeft: objectPaddingLeft,
      })}
    >
      <ObjectName />

      <span>
        {/* TODO: Make this more acdcurate potentially */}
        <ObjectMeta rowHovered={false} />
      </span>
      {[...Array(numGroups)].map((_, i) => {
        const uniqueKey = uniqueId + i;
        return (
          <div
            key={uniqueKey}
            className="object-key-val array-group"
            {...Theme(theme, "objectKeyVal", {
              marginLeft: 6,
              paddingLeft: arrayGroupPaddingLeft,
            })}
          >
            <span {...Theme(theme, "brace-row")}>
              <div
                className="icon-container"
                {...Theme(theme, "icon-container")}
                onClick={(e) => {
                  toggleCollapsed(i);
                }}
              >
                {!collapsed[i] ? <CollapsedIcon /> : <ExpandedIcon />}
              </div>
              {!collapsed[i] ? (
                <span
                  {...Theme(theme, "brace")}
                  onClick={(e) => {
                    toggleCollapsed(i);
                  }}
                  className="array-group-brace"
                >
                  [
                  <div
                    {...Theme(theme, "array-group-meta-data")}
                    className="array-group-meta-data"
                  >
                    <span
                      className="object-size"
                      {...Theme(theme, "object-size")}
                    >
                      {i * size}
                      {" - "}
                      {i * size + size > (value as Json[]).length
                        ? (value as Json[]).length
                        : i * size + size}
                    </span>
                  </div>
                  ]
                </span>
              ) : (
                <JsonObject
                  objectType="array"
                  indexOffset={0}
                  parentIsArrayGroup
                />
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ArrayGroup;
