import dispatcher from "../helpers/dispatcher";
import Theme from "../themes/getStyle";
import { Add as Clear } from "./icons";

// this input appears when adding a new value to an object
const ValidationFailure = ({ message, active, theme, rjvId }) =>
  active ? (
    <div
      className="validation-failure"
      {...Theme(theme, "validation-failure")}
      onClick={() => {
        dispatcher.dispatch({
          rjvId,
          name: "RESET",
        });
      }}
    >
      <span {...Theme(theme, "validation-failure-label")}>{message}</span>
      <Clear {...Theme(theme, "validation-failure-clear")} />
    </div>
  ) : (
    <></>
  );

export default ValidationFailure;
