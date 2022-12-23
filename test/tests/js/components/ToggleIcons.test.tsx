import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

import {
  ArrowDown,
  ArrowRight,
  CircleMinus,
  CirclePlus,
  SquareMinus,
  SquarePlus,
} from "@/js/components/icons";
import ReactJsonViewContext from "@/js/components/ReactJsonViewContext";
import { CollapsedIcon, ExpandedIcon } from "@/js/components/ToggleIcons";
import Theme from "@/js/themes/getStyle";

describe("<ToggleIcons />", () => {
  afterEach(() => {
    cleanup();
  });

  it("ExpandedIcon render", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={{ props: { theme: "rjv-default" } } as any}
      >
        <ExpandedIcon />
      </ReactJsonViewContext.Provider>,
    );
    const expandedIconElem =
      rendered.container.querySelectorAll(".expanded-icon");
    expect(expandedIconElem).toHaveLength(1);
  });

  it("CollapsedIcon mount", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={{ props: { theme: "rjv-default" } } as any}
      >
        <CollapsedIcon />
      </ReactJsonViewContext.Provider>,
    );
    const collapsedIconElem =
      rendered.container.querySelectorAll(".collapsed-icon");
    expect(collapsedIconElem).toHaveLength(1);
  });

  it("ExpandedIcon with triangle style", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          { props: { theme: "rjv-default", iconStyle: "triangle" } } as any
        }
      >
        <ExpandedIcon />
      </ReactJsonViewContext.Provider>,
    );

    const arrowDownElem = render(
      <ArrowDown
        {...Theme("rjv-default", "expanded-icon")}
        className="expanded-icon"
      />,
    );
    expect(rendered.container).toStrictEqual(arrowDownElem.container);
  });

  it("ExpandedIcon with square style", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={{ props: { theme: "rjv-default", iconStyle: "square" } } as any}
      >
        <ExpandedIcon />
      </ReactJsonViewContext.Provider>,
    );

    const squareElem = render(
      <SquareMinus
        {...Theme("rjv-default", "expanded-icon")}
        className="expanded-icon"
      />,
    );
    expect(rendered.container).toStrictEqual(squareElem.container);
  });

  it("ExpandedIcon with no style", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={{ props: { theme: "rjv-default" } } as any}
      >
        <ExpandedIcon />
      </ReactJsonViewContext.Provider>,
    );

    const circleElem = render(
      <CircleMinus
        {...Theme("rjv-default", "expanded-icon")}
        className="expanded-icon"
      />,
    );
    expect(rendered.container).toStrictEqual(circleElem.container);
  });

  it("CollapsedIcon with triangle style", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          { props: { theme: "rjv-default", iconStyle: "triangle" } } as any
        }
      >
        <CollapsedIcon />
      </ReactJsonViewContext.Provider>,
    );

    const arrowRightElem = render(
      <ArrowRight
        {...Theme("rjv-default", "collapsed-icon")}
        className="collapsed-icon"
      />,
    );
    expect(rendered.container).toStrictEqual(arrowRightElem.container);
  });

  it("CollapsedIcon with square style", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={{ props: { theme: "rjv-default", iconStyle: "square" } } as any}
      >
        <CollapsedIcon />
      </ReactJsonViewContext.Provider>,
    );

    const squarePlusElem = render(
      <SquarePlus
        {...Theme("rjv-default", "collapsed-icon")}
        className="collapsed-icon"
      />,
    );
    expect(rendered.container).toStrictEqual(squarePlusElem.container);
  });

  it("CollapsedIcon with no style", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={{ props: { theme: "rjv-default" } } as any}
      >
        <CollapsedIcon />
      </ReactJsonViewContext.Provider>,
    );

    const circlePlusElem = render(
      <CirclePlus
        {...Theme("rjv-default", "collapsed-icon")}
        className="collapsed-icon"
      />,
    );
    expect(rendered.container).toStrictEqual(circlePlusElem.container);
  });
});
