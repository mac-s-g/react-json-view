import "../../style/scss/rjv-demo.scss";

import { useState } from "react";

import { Json } from "../../../../src/js/components/ReactJsonViewContext";
import ReactJson from "../../../../src/js/index";

const Demo = () => {
  const [value, setValue] = useState<Json & object>({
    bool: true,
    number: 5,
    str: "test",
    nan: NaN,
    null: null,
    arr: [1, 2],
    obj: {
      test: true,
    },
    empty_arr: [],
    empty_obj: {},
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
