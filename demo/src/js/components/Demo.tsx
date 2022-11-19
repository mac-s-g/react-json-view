import "../../style/scss/rjv-demo.scss";

import { useState } from "react";

import { Json } from "../../../../src/js/components/ReactJsonViewContext";
import ReactJson from "../../../../src/js/index";

const Demo = () => {
  const [value, setValue] = useState<Json & object>({
    a: 4,
    b: 5,
    c: {
      nestedA: 4,
      nestedB: 8,
    },
  });

  return (
    <ReactJson
      value={value}
      onChange={setValue}
      rootNodeName="root"
      canEdit
      canDelete
      canAdd
    />
  );
};

export default Demo;
