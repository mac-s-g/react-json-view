import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

import ReactJsonViewContext from "@/js/components/ReactJsonViewContext";
import ValidationFailure from "@/js/components/ValidationFailure";

describe("<ValidationFailure />", () => {
  afterEach(() => {
    cleanup();
  });
  const rjvId = "id";

  it("ValidationFailure should be on page when active", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={{ props: { theme: "rjvDefault" }, rjvId } as any}
      >
        <ValidationFailure message="hello" active />,
      </ReactJsonViewContext.Provider>,
    );
    const validationFailureElem = rendered.container.querySelectorAll(
      ".validation-failure",
    );
    expect(validationFailureElem).toHaveLength(1);
  });

  it("ValidationFailure should not be on page when inactive", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={{ props: { theme: "rjvDefault" }, rjvId } as any}
      >
        <ValidationFailure message="hello" active={false} />,
      </ReactJsonViewContext.Provider>,
    );
    const validationFailureElem = rendered.container.querySelectorAll(
      ".validation-failure",
    );
    expect(validationFailureElem).toHaveLength(0);
  });

  it("ValidationFailure touch click event", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={{ props: { theme: "rjvDefault" }, rjvId } as any}
      >
        <ValidationFailure message="hello" active={false} />,
      </ReactJsonViewContext.Provider>,
    );
    const validationFailureElem = rendered.container.querySelectorAll(
      ".validation-failure",
    );
    expect(validationFailureElem).toHaveLength(0);
  });
});
