import { useEffect, useId, useState } from "react";

import attributeStore from "../stores/ObjectAttributes";
// global theme
import themeStyle from "../themes/getStyle";
import JsonViewer from "./JsonViewer";
import ObjectKeyModal from "./ObjectKeyModal/ObjectKeyModal";
import ReactJsonViewContext, {
  ReactJsonViewProps,
} from "./ReactJsonViewContext";
import ValidationFailure from "./ValidationFailure";

const ReactJsonView = ({
  value = {},
  onChange = () => {
    /* NOOP */
  },
  rootNodeName = "root",

  style = {},
  newKeyDefaultValue = null,
  shouldCollapse = () => false,
  theme = "rjvDefault",
  validationMessage = "Validation Error",
  collapseStringsAfterLength = 4,
  sortKeys = false,
  quotesOnKeys = false,
  groupArraysAfterLength = 100,
  indentWidth = 4,
  enableClipboard = true,
  displayDataTypes = true,
  displayArrayKey = true,
  canEdit = false,
  canDelete = false,
  canAdd = false,
  displayObjectSize = true,
  iconStyle = "triangle",
}: Partial<ReactJsonViewProps>) => {
  // listen to request to add/edit a key to an object
  const [addKeyRequest, setAddKeyRequest] = useState(false);
  const [editKeyRequest, setEditKeyRequest] = useState(false);
  const [validationFailure, setValidationFailure] = useState(false);

  const rjvId = useId();

  useEffect(() => {
    attributeStore.set(rjvId, "global", "src", value);
    attributeStore.on(`add-key-request-${rjvId}`, addKeyRequestHandler);
    const listeners = getListeners();
    for (const i in listeners) {
      attributeStore.on(`${i}-${rjvId}`, (listeners as any)[i]);
    }
  }, []);

  const getListeners = () => {
    return {
      reset: onClose,
      "variable-update": updateSrc,
      "add-key-request": addKeyRequestHandler,
    };
  };

  const addKeyRequestHandler = () => {
    setAddKeyRequest(true);
  };

  const updateSrc = () => {
    const { name, namespace, newValue, existingValue, updatedSrc, type } =
      attributeStore.get(rjvId, "action", "variable-update");

    let result: boolean | object = false;

    const onEditPayload = {
      existingSrc: value,
      newValue,
      updatedSrc,
      name,
      namespace,
      existingValue,
    };
    switch (type) {
      case "variable-added":
        onChange(onEditPayload.updatedSrc);
        result = onEditPayload;
        break;
      case "variable-edited":
        onChange(onEditPayload.updatedSrc);
        result = onEditPayload;
        break;
      case "variable-removed":
        onChange(onEditPayload.updatedSrc);
        result = onEditPayload;
        break;
      default:
    }
    if (result !== false) {
      attributeStore.set(rjvId, "global", "src", updatedSrc);
    } else {
      setValidationFailure(true);
    }
  };

  const onClose = () => {
    setAddKeyRequest(false);
    setValidationFailure(false);
  };

  return (
    <div
      className="react-json-view"
      style={{ ...themeStyle(theme, "app-container").style, ...themeStyle }}
    >
      <ReactJsonViewContext.Provider
        value={{
          rjvId,
          props: {
            canAdd,
            canDelete,
            canEdit,
            collapseStringsAfterLength,
            displayArrayKey,
            displayDataTypes,
            displayObjectSize,
            enableClipboard,
            groupArraysAfterLength,
            iconStyle,
            indentWidth,
            onChange,
            quotesOnKeys,
            rootNodeName,
            shouldCollapse,
            sortKeys,
            style,
            theme,
            validationMessage,
            value,
            newKeyDefaultValue,
          },
        }}
      >
        <ValidationFailure
          message={validationMessage}
          active={validationFailure}
        />
        <JsonViewer />
        <ObjectKeyModal active={addKeyRequest} onClose={onClose} />
      </ReactJsonViewContext.Provider>
    </div>
  );
};

export default ReactJsonView;
