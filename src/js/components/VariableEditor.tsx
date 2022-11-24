/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useMemo, useState } from "react";
import AutosizeTextarea from "react-textarea-autosize";

import parseInput from "../helpers/parseInput";
import stringifyVariable from "../helpers/stringifyVariable";
import { DISPLAY_BRACES, SINGLE_INDENT, toType } from "../helpers/util";
import attributeStore from "../stores/ObjectAttributes";
import Theme from "../themes/getStyle";
import CopyToClipboard from "./CopyToClipboard";
// data type components
import { JsonBoolean, JsonNull, JsonNumber, JsonString } from "./DataTypes";
// clibboard icon
import { CheckCircle, Edit, RemoveCircle as Remove } from "./icons";
import LocalJsonViewContext from "./LocalJsonViewContext";
import ReactJsonViewContext, { Json, TypeName } from "./ReactJsonViewContext";

type EditState = { editMode: false } | { editMode: true; editValue: string };

const EditIcon = ({
  onEdit,
  hovered,
}: {
  hovered: boolean;
  onEdit: () => void;
}) => {
  const {
    props: { theme },
  } = useContext(ReactJsonViewContext);
  return (
    <div
      className="click-to-edit"
      style={{
        verticalAlign: "top",
        display: hovered ? "inline-block" : "none",
      }}
    >
      <Edit
        className="click-to-edit-icon"
        {...Theme(theme, "editVarIcon")}
        onClick={onEdit}
      />
    </div>
  );
};

const RemoveIcon = ({
  hovered,
  handleClick,
}: {
  hovered: boolean;
  handleClick: (
    rjvd: string,
    namespace: (string | null)[],
    value: Json,
  ) => void;
}) => {
  const { namespace, value } = useContext(LocalJsonViewContext);
  const {
    props: { theme },
    rjvId,
  } = useContext(ReactJsonViewContext);
  const name = namespace.at(-1);
  return (
    <div
      className="click-to-remove"
      style={{
        verticalAlign: "top",
        display: hovered ? "inline-block" : "none",
      }}
    >
      <Remove
        className="click-to-remove-icon"
        {...Theme(theme, "removeVarIcon")}
        onClick={() => {
          handleClick(rjvId, namespace, value);
        }}
      />
    </div>
  );
};

const Value = ({
  edit,
  setEdit,
  submitEdit,
}: {
  edit: EditState;
  setEdit: (n: EditState) => void;
  submitEdit: () => void;
}) => {
  const { value } = useContext(LocalJsonViewContext);
  const type = edit.editMode ? "edit" : toType(value);
  switch (type) {
    case "edit":
      return (
        <EditInput submitEdit={submitEdit} edit={edit} setEdit={setEdit} />
      );
    case "string":
      return <JsonString />;
    case "boolean":
      return <JsonBoolean />;
    case "null":
      return <JsonNull />;
    case "number":
      return <JsonNumber />;
    default:
      throw new Error("Invalid Type passed to VariableEditor");
  }
};

const EditInput = ({
  edit,
  setEdit,
  submitEdit,
}: {
  edit: EditState;
  setEdit: (n: EditState) => void;
  submitEdit: () => void;
}) => {
  const {
    props: { theme },
    rjvId,
  } = useContext(ReactJsonViewContext);
  const { namespace } = useContext(LocalJsonViewContext);

  return (
    <div>
      <AutosizeTextarea
        type="text"
        ref={(input: HTMLInputElement) => input && input.focus()}
        value={edit.editMode ? edit.editValue : ""}
        className="variable-editor"
        onChange={(event) => {
          const { value } = event.target;

          setEdit({
            editMode: true,
            editValue: value,
          });
        }}
        onKeyDown={(e) => {
          switch (e.key) {
            case "Escape": {
              setEdit({
                editMode: false,
              });
              break;
            }
            case "Enter": {
              if (e.ctrlKey || e.metaKey) {
                submitEdit();
              }
              break;
            }
            default:
              break;
          }
          e.stopPropagation();
        }}
        placeholder="update this value"
        minRows={2}
        {...Theme(theme, "edit-input")}
      />
      <div {...Theme(theme, "edit-icon-container")}>
        <Remove
          className="edit-cancel"
          {...Theme(theme, "cancel-icon")}
          onClick={() => {
            setEdit({ editMode: false });
          }}
        />
        <CheckCircle
          className="edit-check string-value"
          {...Theme(theme, "check-icon")}
          onClick={() => {
            submitEdit();
          }}
        />
        <div>
          <ShowDetected edit={edit} submitEdit={submitEdit} />
        </div>
      </div>
    </div>
  );
};

const ShowDetected = ({
  submitEdit,
  edit,
}: {
  edit: EditState;
  submitEdit: (eubmitDetected?: boolean) => void;
}) => {
  const {
    props: { theme },
  } = useContext(ReactJsonViewContext);

  const parsedInput: { type: TypeName | boolean; value: Json } = edit.editMode
    ? parseInput(edit.editValue)
    : { type: false, value: null };

  const detected = <DetectedInput parsedInput={parsedInput} />;
  if (detected) {
    return (
      <div>
        <div {...Theme(theme, "detected-row")}>
          {detected}
          <CheckCircle
            style={{
              verticalAlign: "top",
              paddingLeft: "3px",
              ...Theme(theme, "check-icon").style,
            }}
            onClick={() => submitEdit(true)}
          />
        </div>
      </div>
    );
  }
  return <></>;
};

const DetectedInput = ({
  parsedInput,
}: {
  parsedInput: { type: TypeName | boolean; value: Json };
}) => {
  const {
    props: { theme },
  } = useContext(ReactJsonViewContext);

  const { type, value } = parsedInput;

  if (type !== false) {
    switch ((type as string).toLowerCase()) {
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
              [
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
              ]
            </span>
          </span>
        );
      case "string":
        return <JsonString dataValue={value as string} />;
      case "number":
        return <JsonNumber dataValue={value as number} />;
      case "boolean":
        return <JsonBoolean />;
      case "null":
        return <JsonNull />;
      default:
        throw new Error("Invalid Type");
    }
  }
  return <></>;
};

const VariableEditor = () => {
  const {
    props: {
      enableClipboard,
      canEdit,
      canDelete,
      theme,
      indentWidth,
      quotesOnKeys,
      displayArrayKey,
      onChange,
    },
    rjvId,
  } = useContext(ReactJsonViewContext);

  const { namespace, value } = useContext(LocalJsonViewContext);
  const type = toType(value);
  const name = namespace.at(-1);

  const [edit, setEdit] = useState<EditState>({ editMode: false });

  const [hovered, setHovered] = useState<boolean>(false);
  const [renameKey, setRenameKey] = useState<boolean>(false);

  const enterEditMode = () => {
    if (canEdit) {
      const stringifiedValue = stringifyVariable(
        value as number | string | boolean | null,
      );

      setEdit({
        editMode: true,
        editValue: stringifiedValue,
      });
    }
  };

  const submitEdit = (submitDetected?: boolean) => {
    const newValue =
      edit.editMode &&
      (submitDetected ? parseInput(edit.editValue).value : edit.editValue);

    setEdit({ editMode: false });

    const data = {
      name,
      namespace,
      existingValue: value,
      newValue,
      updatedSrc: {},
      variableRemoved: false,
    };

    attributeStore.handleAction({
      name: "VARIABLE_UPDATED",
      rjvId,
      data,
    });
    onChange(data.updatedSrc);
  };

  const removeVariable = (
    rjvId: string,
    namespace: (string | null)[],
    value: Json,
  ) => {
    const data = {
      name,
      namespace,
      existingValue: value,
      updatedSrc: {},
      variableRemoved: true,
    };

    attributeStore.handleAction({
      name: "VARIABLE_REMOVED",
      rjvId,
      data,
    });
    onChange(data.updatedSrc);
  };

  return (
    <div
      {...Theme(theme, "objectKeyVal", {
        paddingLeft: indentWidth * SINGLE_INDENT,
        minHeight: "20px",
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="variable-row"
      key={name}
    >
      {type === "array" ? (
        displayArrayKey ? (
          <span {...Theme(theme, "array-key")} key={`${name}_${namespace}`}>
            {name}
            <div {...Theme(theme, "colon")}>:</div>
          </span>
        ) : null
      ) : (
        <span>
          <span
            {...Theme(theme, "object-name")}
            className="object-key"
            key={`${name}_${namespace}`}
          >
            {!!quotesOnKeys && (
              <span style={{ verticalAlign: "top" }}>
                {DISPLAY_BRACES.doubleQuotes.start}
              </span>
            )}
            <span style={{ display: "inline-block" }}>{name}</span>
            {!!quotesOnKeys && (
              <span style={{ verticalAlign: "top" }}>
                {DISPLAY_BRACES.doubleQuotes.end}
              </span>
            )}
          </span>
          <span {...Theme(theme, "colon")}>:</span>
        </span>
      )}
      <div
        className="variable-value"
        onClick={
          !canEdit
            ? undefined
            : (e) => {
                const location = [...namespace];
                if (e.ctrlKey || e.metaKey) {
                  enterEditMode();
                }
              }
        }
        {...Theme(theme, "variableValue", {})}
      >
        <Value edit={edit} setEdit={setEdit} submitEdit={submitEdit} />
      </div>
      {enableClipboard ? <CopyToClipboard rowHovered={hovered} /> : null}
      {canEdit && !edit.editMode && (
        <EditIcon
          hovered={hovered}
          onEdit={() => {
            enterEditMode();
          }}
        />
      )}
      {canDelete && !edit.editMode && (
        <RemoveIcon hovered={hovered} handleClick={removeVariable} />
      )}
    </div>
  );
};

export default VariableEditor;
