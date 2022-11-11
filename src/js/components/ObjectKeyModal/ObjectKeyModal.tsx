/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useState } from "react";

import Theme from "../../themes/getStyle";
import { Add as Cancel, CheckCircle } from "../icons";
import ReactJsonViewContext from "../ReactJsonViewContext";

// TODO: Add support for editing keys (not just creating them);
const ObjectKeyModal = ({
  onClose,
  active,
}: {
  onClose: () => void;
  active: boolean;
}) => {
  const {
    props: { theme, newKeyDefaultValue },
  } = useContext(ReactJsonViewContext);

  const [input, setInput] = useState(newKeyDefaultValue);

  // TODO: Figure out what the invalid state is supposed to mean
  const valid = true;

  const handleSubmit = () => {
    // TODO: Write logic to actually submit
  };

  return active ? (
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
