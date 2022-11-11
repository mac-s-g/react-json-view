import "../../style/scss/rjv-demo.scss";
import "react-select/dist/react-select.css";
import "react-github-button/assets/style.css";

import React, { useState } from "react";

import { Json } from "../../../../src/js/components/ReactJsonViewContext";
import ReactJson from "../../../../src/js/index";
import Code from "../helpers/Code";

const Demo = () => {
  const [value, setValue] = useState<Json & object>({ a: 4, b: 5 });
  return <ReactJson value={value} onChange={setValue} rootNodeName="root" />;
};

export default Demo;
