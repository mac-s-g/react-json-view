import React, { useState } from "react";
import AutosizeTextarea from "react-textarea-autosize";

import dispatcher from "../helpers/dispatcher";
import parseInput from "../helpers/parseInput";
import stringifyVariable from "../helpers/stringifyVariable";
import CopyToClipboard from "./CopyToClipboard";

//data type components
import {
  JsonBoolean,
  JsonDate,
  JsonFloat,
  JsonFunction,
  JsonInteger,
  JsonNan,
  JsonNull,
  JsonRegexp,
  JsonString,
  JsonUndefined,
} from "./DataTypes/DataTypes";

//clibboard icon
import { Edit, CheckCircle, RemoveCircle as Remove } from "./icons";

//theme
import Theme from "../themes/getStyle";

const EditIcon = ({ variable, theme, hovered, prepopulateInput }) => {
  return (
    <div
      className="click-to-edit"
      style={{
        verticalAlign: "top",
        display: hovered ? "inline-block" : "none",
      }}
    >
      <Edit
        class="click-to-edit-icon"
        {...Theme(theme, "editVarIcon")}
        onClick={() => {
          prepopulateInput(variable);
        }}
      />
    </div>
  );
};

const RemoveIcon = ({ variable, namespace, theme, rjvId, hovered }) => {
  return (
    <div
      className="click-to-remove"
      style={{
        verticalAlign: "top",
        display: hovered ? "inline-block" : "none",
      }}
    >
      <Remove
        class="click-to-remove-icon"
        {...Theme(theme, "removeVarIcon")}
        onClick={() => {
          dispatcher.dispatch({
            name: "VARIABLE_REMOVED",
            rjvId: rjvId,
            data: {
              name: variable.name,
              namespace: namespace,
              existing_value: variable.value,
              variable_removed: true,
            },
          });
        }}
      />
    </div>
  );
};

const Value = ({
  variable,
  editMode,
  editValue,
  namespace,
  parsedInput,
  rjvId,
  setEditMode,
  theme,
  submitEdit,
  setParsedInput,
  setEditValue,
}) => {
  // TODO: FIX THIS LOL
  const props = {};

  const type = editMode ? false : variable.type;
  switch (type) {
    case false:
      return (
        <EditInput
          editValue={editValue}
          namespace={namespace}
          parsedInput={parsedInput}
          rjvId={rjvId}
          setEditMode={setEditMode}
          setEditValue={setEditValue}
          setParsedInput={setParsedInput}
          submitEdit={submitEdit}
          theme={theme}
          variable={variable}
        />
      );
    case "string":
      return <JsonString value={variable.value} {...props} />;
    case "integer":
      return <JsonInteger value={variable.value} {...props} />;
    case "float":
      return <JsonFloat value={variable.value} {...props} />;
    case "boolean":
      return <JsonBoolean value={variable.value} {...props} />;
    case "function":
      return <JsonFunction value={variable.value} {...props} />;
    case "null":
      return <JsonNull {...props} />;
    case "nan":
      return <JsonNan {...props} />;
    case "undefined":
      return <JsonUndefined {...props} />;
    case "date":
      return <JsonDate value={variable.value} {...props} />;
    case "regexp":
      return <JsonRegexp value={variable.value} {...props} />;
    default:
      // catch-all for types that weren't anticipated
      return (
        <div className="object-value">{JSON.stringify(variable.value)}</div>
      );
  }
};

const EditInput = ({
  theme,
  editValue,
  setEditValue,
  setParsedInput,
  setEditMode,
  submitEdit,
  namespace,
  variable,
  rjvId,
  parsedInput,
}) => {
  return (
    <div>
      <AutosizeTextarea
        type="text"
        inputRef={(input) => input && input.focus()}
        value={editValue}
        class="variable-editor"
        onChange={(event) => {
          const value = event.target.value;
          const detected = parseInput(value);

          setEditValue(value);
          setParsedInput({
            type: detected.type,
            value: detected.value,
          });
        }}
        onKeyDown={(e) => {
          switch (e.key) {
            case "Escape": {
              setEditMode(false);
              setEditValue("");
              break;
            }
            case "Enter": {
              if (e.ctrlKey || e.metaKey) {
                submitEdit(true);
              }
              break;
            }
          }
          e.stopPropagation();
        }}
        placeholder="update this value"
        minRows={2}
        {...Theme(theme, "edit-input")}
      />
      <div {...Theme(theme, "edit-icon-container")}>
        <Remove
          class="edit-cancel"
          {...Theme(theme, "cancel-icon")}
          onClick={() => {
            setEditMode(false);
            setEditValue("");
          }}
        />
        <CheckCircle
          class="edit-check string-value"
          {...Theme(theme, "check-icon")}
          onClick={() => {
            submitEdit();
          }}
        />
        <div>
          <ShowDetected
            namespace={namespace}
            parsedInput={parsedInput}
            rjvId={rjvId}
            theme={theme}
            variable={variable}
            submitEdit={submitEdit}
          />
        </div>
      </div>
    </div>
  );
};

const ShowDetected = ({
  theme,
  variable,
  namespace,
  rjvId,
  parsedInput,
  submitEdit,
}) => {
  const { type, value } = parsedInput;
  const detected = <DetectedInput parsedInput={parsedInput} theme={theme} />;
  if (detected) {
    return (
      <div>
        <div {...Theme(theme, "detected-row")}>
          {detected}
          <CheckCircle
            class="edit-check detected"
            style={{
              verticalAlign: "top",
              paddingLeft: "3px",
              ...Theme(theme, "check-icon").style,
            }}
            onClick={() => {
              submitEdit(true);
            }}
          />
        </div>
      </div>
    );
  }
  return <></>;
};

const DetectedInput = ({ parsedInput, theme }) => {
  const { type, value } = parsedInput;

  // TODO: Fix this LOL
  const props = {};

  if (type !== false) {
    switch (type.toLowerCase()) {
      case "object":
        return (
          <span>
            <span
              style={{
                ...Theme(theme, "brace").style,
                cursor: "default",
              }}
            >
              {"{"}
            </span>
            <span
              style={{
                ...Theme(theme, "ellipsis").style,
                cursor: "default",
              }}
            >
              ...
            </span>
            <span
              style={{
                ...Theme(theme, "brace").style,
                cursor: "default",
              }}
            >
              {"}"}
            </span>
          </span>
        );
      case "array":
        return (
          <span>
            <span
              style={{
                ...Theme(theme, "brace").style,
                cursor: "default",
              }}
            >
              {"["}
            </span>
            <span
              style={{
                ...Theme(theme, "ellipsis").style,
                cursor: "default",
              }}
            >
              ...
            </span>
            <span
              style={{
                ...Theme(theme, "brace").style,
                cursor: "default",
              }}
            >
              {"]"}
            </span>
          </span>
        );
      case "string":
        return <JsonString value={value} {...props} />;
      case "integer":
        return <JsonInteger value={value} {...props} />;
      case "float":
        return <JsonFloat value={value} {...props} />;
      case "boolean":
        return <JsonBoolean value={value} {...props} />;
      case "function":
        return <JsonFunction value={value} {...props} />;
      case "null":
        return <JsonNull {...props} />;
      case "nan":
        return <JsonNan {...props} />;
      case "undefined":
        return <JsonUndefined {...props} />;
      case "date":
        return <JsonDate value={new Date(value)} {...props} />;
    }
  }
  return <></>;
};

const VariableEditor = ({
  variable,
  singleIndent,
  type,
  theme,
  namespace,
  indentWidth,
  enableClipboard,
  onEdit,
  onDelete,
  onSelect,
  displayArrayKey,
  quotesOnKeys,
  rjvId,
}) => {
  // TODO: The first 2 states should be one state
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>("");
  const [hovered, setHovered] = useState<boolean>(false);
  const [renameKey, setRenameKey] = useState<boolean>(false);
  const [parsedInput, setParsedInput] = useState<{
    type: boolean;
    value: null;
  }>({ type: false, value: null });

  // TODO: This isn't needed (bad design)
  const prepopulateInput = (variable) => {
    if (onEdit !== false) {
      const stringifiedValue = stringifyVariable(variable.value);
      const detected = parseInput(stringifiedValue);

      setEditMode(true);
      setEditValue(stringifiedValue);
      setParsedInput({
        type: detected.type,
        value: detected.value,
      });
    }
  };

  const submitEdit = (submit_detected) => {
    let new_value: string | null = editValue;
    if (submit_detected && parsedInput.type) {
      new_value = parsedInput.value;
    }
    setEditMode(false);
    dispatcher.dispatch({
      name: "VARIABLE_UPDATED",
      rjvId: rjvId,
      data: {
        name: variable.name,
        namespace: namespace,
        existing_value: variable.value,
        new_value: new_value,
        variable_removed: false,
      },
    });
  };

  return (
    <div
      {...Theme(theme, "objectKeyVal", {
        paddingLeft: indentWidth * singleIndent,
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="variable-row"
      key={variable.name}
    >
      {type == "array" ? (
        displayArrayKey ? (
          <span
            {...Theme(theme, "array-key")}
            key={variable.name + "_" + namespace}
          >
            {variable.name}
            <div {...Theme(theme, "colon")}>:</div>
          </span>
        ) : null
      ) : (
        <span>
          <span
            {...Theme(theme, "object-name")}
            className="object-key"
            key={variable.name + "_" + namespace}
          >
            {!!quotesOnKeys && <span style={{ verticalAlign: "top" }}>"</span>}
            <span style={{ display: "inline-block" }}>{variable.name}</span>
            {!!quotesOnKeys && <span style={{ verticalAlign: "top" }}>"</span>}
          </span>
          <span {...Theme(theme, "colon")}>:</span>
        </span>
      )}
      <div
        className="variable-value"
        onClick={
          onSelect === false && onEdit === false
            ? undefined
            : (e) => {
                let location = [...namespace];
                if ((e.ctrlKey || e.metaKey) && onEdit !== false) {
                  prepopulateInput(variable);
                } else if (onSelect !== false) {
                  location.shift();
                  onSelect({
                    ...variable,
                    namespace: location,
                  });
                }
              }
        }
        {...Theme(theme, "variableValue", {
          cursor: onSelect === false ? "default" : "pointer",
        })}
      >
        <Value
          variable={variable}
          setEditMode={setEditMode}
          editMode={editMode}
          editValue={editValue}
          namespace={namespace}
          parsedInput={parsedInput}
          rjvId={rjvId}
          setEditValue={setEditValue}
          setParsedInput={setParsedInput}
          submitEdit={submitEdit}
          theme={theme}
        />
      </div>
      {enableClipboard ? (
        <CopyToClipboard
          rowHovered={hovered}
          hidden={editMode}
          src={variable.value}
          clickCallback={enableClipboard}
          {...{ theme, namespace: [...namespace, variable.name] }}
        />
      ) : null}
      {(onEdit !== false && editMode == false) ?? (
        <EditIcon
          hovered={hovered}
          prepopulateInput={prepopulateInput}
          theme={theme}
          variable={variable}
        />
      )}
      {(onDelete !== false && editMode == false) ?? (
        <RemoveIcon
          hovered={hovered}
          namespace={namespace}
          rjvId={rjvId}
          theme={theme}
          variable={variable}
        />
      )}
    </div>
  );
};

export default VariableEditor;
