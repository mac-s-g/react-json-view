/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useContext } from "react";

import Theme from "../themes/getStyle";
import { Add as Clear } from "./icons";
import ReactJsonViewContext from "./ReactJsonViewContext";

// this input appears when adding a new value to an object
const ValidationFailure = ({
  message,
  active,
}: {
  active: boolean;
  message: string;
}) => {
  const {
    props: { theme },
  } = useContext(ReactJsonViewContext);
  return active ? (
    <div
      className="validation-failure"
      {...Theme(theme, "validation-failure")}
      onClick={() => {
        // TODO: Add logic to reset
      }}
    >
      <span {...Theme(theme, "validation-failure-label")}>{message}</span>
      <Clear {...Theme(theme, "validation-failure-clear")} />
    </div>
  ) : (
    <></>
  );
};

export default ValidationFailure;
