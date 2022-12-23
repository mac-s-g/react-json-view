import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

import CopyToClipboard from "@/js/components/CopyToClipboard";
import LocalJsonViewContext from "@/js/components/LocalJsonViewContext";
import ReactJsonViewContext from "@/js/components/ReactJsonViewContext";

describe("<CopyToClipboard />", () => {
  afterEach(() => {
    cleanup();
  });

  it("CopyToClipboard clipboard should exist", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              enableClipboard: true,
            },
          } as any
        }
      >
        {" "}
        <LocalJsonViewContext.Provider
          value={
            {
              value: "test",
            } as any
          }
        >
          <CopyToClipboard rowHovered />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const copyToClipboardContainerElem = rendered.container.querySelectorAll(
      ".copy-to-clipboard-container",
    );

    expect(
      (copyToClipboardContainerElem[0] as HTMLDivElement).style.display,
    ).toBe("inline-block");
  });

  it("CopyToClipboard clipboard should be hidden", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              enableClipboard: false,
            },
          } as any
        }
      >
        {" "}
        <LocalJsonViewContext.Provider
          value={
            {
              value: "test",
            } as any
          }
        >
          <CopyToClipboard rowHovered={false} />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const copyToClipboardContainerElem = rendered.container.querySelectorAll(
      ".copy-to-clipboard-container",
    );

    expect(
      (copyToClipboardContainerElem[0] as HTMLDivElement).style.display,
    ).toBe("none");
  });
});
