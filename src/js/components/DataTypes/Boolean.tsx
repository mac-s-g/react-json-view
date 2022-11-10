import { useContext } from "react";

import Theme from "../../themes/getStyle";
import LocalJsonViewContext from "../LocalJsonViewContext";
import ReactJsonViewContext from "../ReactJsonViewContext";
import DataTypeLabel from "./DataTypeLabel";

const BooleanRenderer = () => {
  const {
    props: { theme },
  } = useContext(ReactJsonViewContext);
  const { value } = useContext(LocalJsonViewContext);

  return (
    <div {...Theme(theme, "boolean")}>
      <DataTypeLabel typeName="boolean" />
      {value ? "true" : "false"}
    </div>
  );
};

export default BooleanRenderer;
