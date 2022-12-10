/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from "react";

import attributeStore from "../../stores/ObjectAttributes";
import Theme from "../../themes/getStyle";
import { Add as Cancel, CheckCircle } from "../icons";
import ReactJsonViewContext from "../ReactJsonViewContext";

const ObjectKeyModal = ({
  onClose,
  addKeyRequest,
  editKeyRequest,
  inputValue,
}: {
  onClose: () => void;
  addKeyRequest?: boolean;
  editKeyRequest?: boolean;
  inputValue?: string;
}) => {
  const {
    props: { theme, newKeyDefaultValue },
    rjvId,
  } = useContext(ReactJsonViewContext);

  const [input, setInput] = useState(inputValue);
  const [valid, setValid] = useState(false);

  const isValid = (input: any) => {
    if (addKeyRequest) {
      const request = attributeStore.get(rjvId, "action", "new-key-request");

      return (
        input !== "" && Object.keys(request.existingValue).indexOf(input) === -1
      );
    }
    if (editKeyRequest) {
      const request = attributeStore.get(rjvId, "action", "edit-key-request");

      return (
        input !== "" &&
        request.name !== input &&
        Object.keys(request.parentObj).indexOf(input) === -1
      );
    }

    return false;
  };

  useEffect(() => {
    setValid(isValid(input));
  }, [input]);

  useEffect(() => {
    setInput(inputValue);
  }, [inputValue]);

  const handleSubmit = () => {
    if (addKeyRequest) {
      const request = attributeStore.get(
        rjvId,
        "action",
        "new-key-request",
        newKeyDefaultValue,
      );
      request.newValue = { ...request.existingValue };
      request.newValue[input!] = newKeyDefaultValue;
      attributeStore.handleAction({
        name: "VARIABLE_ADDED",
        rjvId,
        data: request,
      });
      setInput("");
    } else {
      const request = attributeStore.get(rjvId, "action", "edit-key-request");
      request.keyName = input;
      request.newValue = request.existingValue;
      request.variableKeyUpdated = true;
      attributeStore.handleAction({
        name: "VARIABLE_KEY_UPDATED",
        rjvId,
        data: request,
      });
    }
    onClose();
  };

  return addKeyRequest || editKeyRequest ? (
    <div
      className="key-modal-request"
      {...Theme(theme, "key-modal-request")}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div {...Theme(theme, "key-modal")}>
        <div {...Theme(theme, "key-modal-label")}>Key Name:</div>
        <div style={{ position: "relative" }}>
          <input
            {...Theme(theme, "key-modal-input")}
            className="key-modal-input"
            ref={(el) => el && el.focus()}
            spellCheck={false}
            value={input}
            placeholder="..."
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyPress={(e) => {
              if (valid && e.key === "Enter") {
                handleSubmit();
              } else if (e.key === "Escape") {
                setInput("");
                onClose();
              }
            }}
          />
          {valid ? (
            <CheckCircle
              {...Theme(theme, "key-modal-submit")}
              className="key-modal-submit"
              onClick={() => handleSubmit()}
            />
          ) : null}
        </div>
        <span {...Theme(theme, "key-modal-cancel")}>
          <Cancel
            {...Theme(theme, "key-modal-cancel-icon")}
            className="key-modal-cancel"
            onClick={() => {
              setInput("");
              onClose();
            }}
          />
        </span>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ObjectKeyModal;
