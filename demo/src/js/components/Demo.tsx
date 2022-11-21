import "../../style/scss/rjv-demo.scss";

import { useState } from "react";

import { Json } from "../../../../src/js/components/ReactJsonViewContext";
import ReactJson from "../../../../src/js/index";

const Demo = () => {
  const [value, setValue] = useState<Json & object>({
    stringV: "this is a test string",
    integer: 42,
    empty_array: [],
    empty_object: {},
    array: [1, 2, 3, "test"],
    float: -2.757,
    parent: {
      sibling1: true,
      sibling2: false,
      sibling3: null,
    },
    string_number: "1234",
  });

  return (
    <ReactJson
      value={value}
      onChange={setValue}
      rootNodeName="root"
      theme="apathy"
      canEdit
      canDelete
      canAdd
    />
  );
};

export default Demo;
