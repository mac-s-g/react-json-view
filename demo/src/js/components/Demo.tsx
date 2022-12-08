import "../../style/scss/rjv-demo.scss";

import { useState } from "react";

import { Json } from "../../../../src/js/components/ReactJsonViewContext";
import ReactJson from "../../../../src/js/index";

const Demo = () => {
  const [value, setValue] = useState<Json & object>({
    test: true,
    passing: "hopefully",
    arr: [5],
    obj: {},
    regexp: /[0-9]/gi
});

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
