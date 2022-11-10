import { useContext } from "react";

// theme
import Theme from "../../themes/getStyle";
import ReactJsonViewContext from "../ReactJsonViewContext";

const NullDataType = () => {
  const {
    props: { theme },
  } = useContext(ReactJsonViewContext);

  return <div {...Theme(theme, "null")}>NULL</div>;
};

export default NullDataType;
