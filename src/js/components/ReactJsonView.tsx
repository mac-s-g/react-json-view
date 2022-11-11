import { useId, useState } from "react";

// global theme
import themeStyle from "../themes/getStyle";
import JsonViewer from "./JsonViewer";
import ObjectKeyModal from "./ObjectKeyModal/ObjectKeyModal";
import ReactJsonViewContext, {
  ReactJsonViewProps,
} from "./ReactJsonViewContext";
import ValidationFailure from "./ValidationFailure";

const ReactJsonView = ({
  value,
  onChange,
  rootNodeName,

  style = {},
  newKeyDefaultValue = null,
  shouldCollapse = () => false,
  theme,
  validationMessage = "Validation Error",
  collapseStringsAfterLength = Infinity,
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
}: ReactJsonViewProps) => {
  // listen to request to add/edit a key to an object
  const [addKeyRequest, setAddKeyRequest] = useState(false);
  const [editKeyRequest, setEditKeyRequest] = useState(false);
  const [validationFailure, setValidationFailure] = useState(false);

  const rjvId = useId();

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
          theme={theme}
          rjvId={rjvId}
        />
        <JsonViewer />
        <ObjectKeyModal
          active={addKeyRequest}
          onClose={() => setAddKeyRequest(false)}
        />
      </ReactJsonViewContext.Provider>
    </div>
  );
};

export default ReactJsonView;
