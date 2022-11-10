import React, { useContext } from "react";

import { SINGLE_INDENT } from "../helpers/util";
import Theme from "../themes/getStyle";
import ObjectComponent from "./DataTypes/Object";
import LocalJsonViewContext from "./LocalJsonViewContext";
import ObjectName from "./ObjectName";
import ReactJsonViewContext, { Json } from "./ReactJsonViewContext";
// icons
import { CollapsedIcon, ExpandedIcon } from "./ToggleIcons";
import VariableMeta from "./VariableMeta";

// single indent is 5px

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expanded: [],
    };
  }

  toggleCollapsed = (i) => {
    const newExpanded = [];
    for (const j in this.state.expanded) {
      newExpanded.push(this.state.expanded[j]);
    }
    newExpanded[i] = !newExpanded[i];
    this.setState({
      expanded: newExpanded,
    });
  };

  getExpandedIcon(i) {
    const { theme, iconStyle } = this.props;

    if (this.state.expanded[i]) {
      return <ExpandedIcon {...{ theme, iconStyle }} />;
    }

    return <CollapsedIcon {...{ theme, iconStyle }} />;
  }
}

/* *********************************************************** */
/* New Code                                                    */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */
/* *********************************************************** */

const ArrayGroup = () => {
  const { name } = this.props;

  const { namespace, value, depth } = useContext(LocalJsonViewContext);
  const {
    props: { theme, groupArraysAfterLength, indentWidth },
  } = useContext(ReactJsonViewContext);

  const isRoot = depth === 0;

  let object_padding_left = 0;

  const array_group_padding_left = indentWidth * SINGLE_INDENT;

  if (!isRoot) {
    object_padding_left = indentWidth * SINGLE_INDENT;
  }

  const size = groupArraysAfterLength;
  const groups = Math.ceil((value as Json[]).length / size);

  return (
    <div
      className="object-key-val"
      {...Theme(theme, isRoot ? "jsv-root" : "objectKeyVal", {
        paddingLeft: object_padding_left,
      })}
    >
      <ObjectName />

      <span>
        <VariableMeta size={src.length} {...this.props} />
      </span>
      {[...Array(groups)].map((_, i) => (
        <div
          key={i}
          className="object-key-val array-group"
          {...Theme(theme, "objectKeyVal", {
            marginLeft: 6,
            paddingLeft: array_group_padding_left,
          })}
        >
          <span {...Theme(theme, "brace-row")}>
            <div
              className="icon-container"
              {...Theme(theme, "icon-container")}
              onClick={(e) => {
                this.toggleCollapsed(i);
              }}
            >
              {this.getExpandedIcon(i)}
            </div>
            {this.state.expanded[i] ? (
              <ObjectComponent
                key={name + i}
                depth={0}
                name={false}
                collapsed={false}
                groupArraysAfterLength={size}
                index_offset={i * size}
                src={src.slice(i * size, i * size + size)}
                namespace={namespace}
                type="array"
                parent_type="array_group"
                theme={theme}
              />
            ) : (
              <span
                {...Theme(theme, "brace")}
                onClick={(e) => {
                  this.toggleCollapsed(i);
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
                    {i * size + size > src.length
                      ? src.length
                      : i * size + size}
                  </span>
                </div>
                ]
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};
