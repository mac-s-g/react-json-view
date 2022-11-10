import { useContext, useEffect, useState } from "react";

import getClipboardValue from "../helpers/getClipboardValue";
// theme
import Theme from "../themes/getStyle";
// clibboard icon
import { Clippy } from "./icons";
import ReactJsonViewContext from "./ReactJsonViewContext";

const CopyIcon = ({ theme, copied }) => {
  if (this.state.copied) {
    return (
      <span>
        <Clippy class="copy-icon" {...Theme(theme, "copy-icon")} />
        <span {...Theme(theme, "copy-icon-copied")}>✔</span>
      </span>
    );
  }

  return <Clippy class="copy-icon" {...Theme(theme, "copy-icon")} />;
};

const CopyToClipboard = ({
  hidden,
  rowHovered,
  clickCallback,
}: {
  hidden: boolean;
  rowHovered: boolean;
  clickCallback: unknown;
}) => {
  const { props: rjvProps } = useContext(ReactJsonViewContext);

  const { style } = Theme(rjvProps.theme, "copy-to-clipboard");

  const [copied, setCopied] = useState(false);

  const display = hidden ? "none" : "inline";

  const handleCopy = () => {
    const container = document.createElement("textarea");

    container.innerHTML = JSON.stringify(getClipboardValue(src), null, "  ");

    document.body.appendChild(container);
    container.select();
    document.execCommand("copy");
    document.body.removeChild(container);

    setCopied(true);
    typeof clickCallback === "function" &&
      clickCallback({
        src,
        namespace,
        name: namespace[namespace.length - 1],
      });
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
      <span
        style={{
          ...style,
          display,
        }}
        onClick={handleCopy}
      >
        <CopyIcon copied={copied} theme={theme} />
      </span>
    </span>
  );
};

export default CopyToClipboard;
