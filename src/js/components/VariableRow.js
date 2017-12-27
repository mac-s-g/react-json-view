import React from "react";

export default ({
  onMouseEnter,
  onMouseLeave,
  namespace,
  name,
  src,
  children,
  ...rest
}) => (
  <div
    onMouseEnter={
      !onMouseEnter
        ? null
        : () => {
            let location = [...namespace];
            location.shift();
            location.pop();
            const variable = new JsonVariable(name, src);
            onMouseEnter({
              ...variable,
              namespace: location
            });
          }
    }
    onMouseLeave={
      !onMouseLeave
        ? null
        : () => {
            let location = [...namespace];
            location.shift();
            location.pop();
            const variable = new JsonVariable(name, src);
            onMouseEnter({
              ...variable,
              namespace: location
            });
          }
    }
  >
    {props.children}
  </div>
);
