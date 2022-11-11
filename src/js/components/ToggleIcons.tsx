import { useContext } from "react";

import Theme from "../themes/getStyle";
import {
  ArrowDown,
  ArrowRight,
  CircleMinus,
  CirclePlus,
  SquareMinus,
  SquarePlus,
} from "./icons";
import ReactJsonViewContext from "./ReactJsonViewContext";

export function ExpandedIcon() {
  const {
    props: { theme, iconStyle },
  } = useContext(ReactJsonViewContext);
  switch (iconStyle) {
    case "triangle":
      return (
        <ArrowDown {...Theme(theme, "expanded-icon")} class="expanded-icon" />
      );
    case "square":
      return (
        <SquareMinus {...Theme(theme, "expanded-icon")} class="expanded-icon" />
      );
    default:
      return (
        <CircleMinus {...Theme(theme, "expanded-icon")} class="expanded-icon" />
      );
  }
}

export function CollapsedIcon() {
  const {
    props: { theme, iconStyle },
  } = useContext(ReactJsonViewContext);

  switch (iconStyle) {
    case "triangle":
      return (
        <ArrowRight
          {...Theme(theme, "collapsed-icon")}
          class="collapsed-icon"
        />
      );
    case "square":
      return (
        <SquarePlus
          {...Theme(theme, "collapsed-icon")}
          class="collapsed-icon"
        />
      );
    default:
      return (
        <CirclePlus
          {...Theme(theme, "collapsed-icon")}
          class="collapsed-icon"
        />
      );
  }
}
