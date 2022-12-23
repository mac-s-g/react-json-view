import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

import {
  Add,
  AddCircle,
  ArrowDown,
  ArrowRight,
  CheckCircle,
  CircleMinus,
  CirclePlus,
  Clippy,
  Edit,
  RemoveCircle,
  SquareMinus,
  SquarePlus,
} from "@/js/components/icons";
import Theme from "@/js/themes/getStyle";

describe("svg icons", () => {
  afterEach(() => {
    cleanup();
  });

  it("<CircleMinus /> sanity check", () => {
    const rendered = render(
      <CircleMinus {...Theme("rjvDefault", "expanded-icon")} />,
    );
    const SvgElem = rendered.container.querySelectorAll("svg");
    expect(SvgElem).toHaveLength(1);
  });

  it("<CirclePlus /> sanity check", () => {
    const rendered = render(
      <CirclePlus {...Theme("rjvDefault", "collapsed-icon")} />,
    );
    const SvgElem = rendered.container.querySelectorAll("svg");
    expect(SvgElem).toHaveLength(1);
  });

  it("<SquarePlus /> sanity check", () => {
    const rendered = render(
      <SquarePlus {...Theme("rjvDefault", "collapsed-icon")} />,
    );
    const SvgElem = rendered.container.querySelectorAll("svg");
    expect(SvgElem).toHaveLength(1);
  });

  it("<SquareMinus /> sanity check", () => {
    const rendered = render(
      <SquareMinus {...Theme("rjvDefault", "expanded-icon")} />,
    );
    const SvgElem = rendered.container.querySelectorAll("svg");
    expect(SvgElem).toHaveLength(1);
  });

  it("<ArrowDown /> sanity check", () => {
    const rendered = render(
      <ArrowDown {...Theme("rjvDefault", "expanded-icon")} />,
    );
    const SvgElem = rendered.container.querySelectorAll("svg");
    expect(SvgElem).toHaveLength(1);
  });

  it("<ArrowRight /> sanity check", () => {
    const rendered = render(
      <ArrowRight {...Theme("rjvDefault", "collapsed-icon")} />,
    );
    const SvgElem = rendered.container.querySelectorAll("svg");
    expect(SvgElem).toHaveLength(1);
  });

  it("<Clippy /> sanity check", () => {
    const rendered = render(<Clippy {...Theme("rjvDefault", "copy-icon")} />);
    const SvgElem = rendered.container.querySelectorAll("svg");
    expect(SvgElem).toHaveLength(1);
  });

  it("<RemoveCircle /> sanity check", () => {
    const rendered = render(
      <RemoveCircle {...Theme("rjvDefault", "removeVarIcon")} />,
    );
    const SvgElem = rendered.container.querySelectorAll("svg");
    expect(SvgElem).toHaveLength(1);
  });

  it("<AddCircle /> sanity check", () => {
    const rendered = render(
      <AddCircle {...Theme("rjvDefault", "addVarIcon")} />,
    );
    const SvgElem = rendered.container.querySelectorAll("svg");
    expect(SvgElem).toHaveLength(1);
  });

  it("<Add /> sanity check", () => {
    const rendered = render(
      <Add {...Theme("rjvDefault", "validation-failure-clear")} />,
    );
    const SvgElem = rendered.container.querySelectorAll("svg");
    expect(SvgElem).toHaveLength(1);
  });

  it("<Edit /> sanity check", () => {
    const rendered = render(<Edit {...Theme("rjvDefault", "editVarIcon")} />);
    const SvgElem = rendered.container.querySelectorAll("svg");
    expect(SvgElem).toHaveLength(1);
  });

  it("<CheckCircle /> sanity check", () => {
    const rendered = render(
      <CheckCircle {...Theme("rjvDefault", "check-icon")} />,
    );
    const SvgElem = rendered.container.querySelectorAll("svg");
    expect(SvgElem).toHaveLength(1);
  });

  it("icon with color", () => {
    const rendered = render(
      <CheckCircle
        {...Theme("rjvDefault", "check-icon")}
        style={{ color: "green" }}
      />,
    );
    const SvgElem = rendered.container.querySelectorAll("svg");
    expect(SvgElem).toHaveLength(1);
  });
});
