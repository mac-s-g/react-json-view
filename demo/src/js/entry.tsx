import "../style/scss/global.scss";

import ReactDom from "react-dom";

import Index from "./index";

const app = document.getElementById("mac-react-container");

// app entrypoint
ReactDom.render(
  <div className="app-entry">
    <Index />
  </div>,
  app,
);
