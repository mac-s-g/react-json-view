import { useContext } from "react";

import Theme from "../../themes/getStyle";
import ReactJsonViewContext, { TypeName } from "../ReactJsonViewContext";

const DataTypeLabel = ({ typeName }: { typeName: TypeName }) => {
  const {
    props: { theme, displayDataTypes },
  } = useContext(ReactJsonViewContext);
  if (displayDataTypes) {
    return (
      <span className="data-type-label" {...Theme(theme, "data-type-label")}>
        {typeName}
      </span>
    );
  }
  return <></>;
};

export default DataTypeLabel;
