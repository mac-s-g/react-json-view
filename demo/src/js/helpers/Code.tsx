const Code = ({ children }: { children: JSX.Element }) => {
  return (
    <div
      style={{
        display: "inline-block",
        backgroundColor: "rgb(229, 229, 229)",
        padding: "2px 4px",
        color: "rgb(153,68,68)",
        fontFamily: "monospace",
        letterSpacing: "0.8px",
        fontStyle: "normal",
      }}
    >
      <span>{children}</span>
    </div>
  );
};

export default Code;
