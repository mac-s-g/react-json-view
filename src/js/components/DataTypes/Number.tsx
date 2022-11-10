import { useContext } from "react";

import Theme from "../../themes/getStyle";
import LocalJsonViewContext from "../LocalJsonViewContext";
import ReactJsonViewContext from "../ReactJsonViewContext";
import DataTypeLabel from "./DataTypeLabel";

const NumberDataType = () => {
  const {
    props: { theme },
  } = useContext(ReactJsonViewContext);

  const { value } = useContext(LocalJsonViewContext);
  return (
    <div {...Theme(theme, "number")}>
      <DataTypeLabel typeName="number" />
      {value}
    </div>
  );
};

export default NumberDataType;
