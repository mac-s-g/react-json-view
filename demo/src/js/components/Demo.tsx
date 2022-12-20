import "../../style/scss/rjv-demo.scss";

import { useState } from "react";

import { Json } from "../../../../src/js/components/ReactJsonViewContext";
import ReactJson from "../../../../src/js/index";

const Demo = () => {
  const largeArray = new Array(80).fill("test");
  const [value, setValue] = useState<Json & object>(largeArray);

  return (
    <ReactJson
      value={value}
      onChange={setValue}
      rootNodeName="root"
      theme="monokai"
      canEdit
      canDelete
      canAdd
    />
  );
};

export default Demo;
