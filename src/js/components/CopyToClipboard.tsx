import { useContext, useEffect, useState } from "react";

import getClipboardValue from "../helpers/getClipboardValue";
// theme
import Theme from "../themes/getStyle";
// clibboard icon
import { Clippy } from "./icons";
import LocalJsonViewContext from "./LocalJsonViewContext";
import ReactJsonViewContext from "./ReactJsonViewContext";

const CopyIcon = ({ copied }: { copied: boolean }) => {
  const {
    props: { theme },
  } = useContext(ReactJsonViewContext);
  if (copied) {
    return (
      <span>
        <Clippy class="copy-icon" {...Theme(theme, "copy-icon")} />
        <span {...Theme(theme, "copy-icon-copied")}>✔</span>
      </span>
    );
  }

  return <Clippy class="copy-icon" {...Theme(theme, "copy-icon")} />;
};

const CopyToClipboard = ({ rowHovered }: { rowHovered: boolean }) => {
  const {
    props: { theme, enableClipboard },
  } = useContext(ReactJsonViewContext);

  const { value } = useContext(LocalJsonViewContext);

  const { style } = Theme(theme, "copy-to-clipboard");

  const [copied, setCopied] = useState(false);

  const display = enableClipboard ? "inline" : "none";

  const handleCopy = () => {
    const container = document.createElement("textarea");

    container.innerHTML = JSON.stringify(getClipboardValue(value), null, "  ");

    document.body.appendChild(container);
    container.select();
    document.execCommand("copy");
    document.body.removeChild(container);

    setCopied(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 5500);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <span
      className="copy-to-clipboard-container"
      title="Copy to clipboard"
      style={{
        verticalAlign: "top",
        display: rowHovered ? "inline-block" : "none",
      }}
    >
      <button
        type="button"
        style={{
          ...style,
          display,
        }}
        onClick={handleCopy}
      >
        <CopyIcon copied={copied} />
      </button>
    </span>
  );
};

export default CopyToClipboard;
