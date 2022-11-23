import { useContext } from "react";

// theme
import Theme from "../../themes/getStyle";
import ReactJsonViewContext from "../ReactJsonViewContext";

const NullDataType = ({ dataValue }: { dataValue?: string }) => {
  const {
    props: { theme },
  } = useContext(ReactJsonViewContext);

  return <div {...Theme(theme, "null")}>{dataValue ?? "NULL"}</div>;
};

export default NullDataType;
