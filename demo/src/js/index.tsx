import "../style/scss/global.scss";

import { createRoot } from "react-dom/client";

import ReactJsonDemo from "./components/Demo";

const Index = () => {
  return (
    <div className="mac-react">
      <ReactJsonDemo />
    </div>
  );
};

const app = document.getElementById("mac-react-container");

// app entrypoint
const root = createRoot(app!);

root.render(
  <div className="app-entry">
    <Index />
  </div>,
);
