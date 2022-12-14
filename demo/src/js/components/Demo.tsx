import "../../style/scss/rjv-demo.scss";

import { useState } from "react";

import { Json } from "../../../../src/js/components/ReactJsonViewContext";
import ReactJson from "../../../../src/js/index";

const Demo = () => {
  const [value, setValue] = useState<Json & object>({
    bool: true,
    str: "test",
    int: 5,
    nan: NaN,
    null: null,
    obj: {
      arrChild: [1, 2, "three"],
      objChild: {
        one: 1,
        two: "two",
      },
    },
    arr: [[1, "two"], { one: "one", two: 2 }],
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
