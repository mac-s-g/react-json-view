import "@testing-library/jest-dom";

import { fireEvent, render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";
import { useLayoutEffect, useState } from "react";

import ObjectKeyModal from "@/js/components/ObjectKeyModal/ObjectKeyModal";
import ReactJsonViewContext from "@/js/components/ReactJsonViewContext";
import attributeStore from "@/js/stores/ObjectAttributes";

const rjvId = 1;

describe("<ObjectKeyModal />", () => {
  afterEach(() => {
    cleanup();
  });

  const request = {
    existingValue: { obj: "test" },
    keyName: null,
    name: null,
    namespace: [],
    variableRemoved: false,
  };

  const ObjectModelCompeonent = ({
    addKeyRequest,
    editKeyRequest,
    inputValue,
  }: {
    addKeyRequest?: boolean;
    editKeyRequest?: boolean;
    inputValue?: string;
  }) => {
    const [addKey, setAddKey] = useState(addKeyRequest);
    useLayoutEffect(() => {
      attributeStore.set(rjvId, "global", "src", { obj: "test" });
      attributeStore.handleAction({
        name: "ADD_VARIABLE_KEY_REQUEST",
        rjvId,
        data: request,
      });
    }, []);

    return (
      <ReactJsonViewContext.Provider
        value={
          {
            props: { theme: "rjvDefault", newKeyDefaultValue: null },
            rjvId,
          } as any
        }
      >
        <ObjectKeyModal
          onClose={() => setAddKey(false)}
          addKeyRequest={addKey}
          editKeyRequest={editKeyRequest}
          inputValue={inputValue}
        />
      </ReactJsonViewContext.Provider>
    );
  };

  it("ObjectKeyModal popup render", () => {
    const rendered = render(
      <>
        <ObjectModelCompeonent addKeyRequest />
      </>,
    );
    const keyModalRequestElem =
      rendered.container.querySelectorAll(".key-modal-request");
    expect(keyModalRequestElem).toHaveLength(1);
  });

  it("ObjectKeyModal invalid input", () => {
    const rendered = render(
      <>
        <ObjectModelCompeonent addKeyRequest inputValue="obj" />
      </>,
    );
    const keyModalSubmitElem =
      rendered.container.querySelectorAll(".key-modal-submit");
    expect(keyModalSubmitElem).toHaveLength(0);
  });

  it("ObjectKeyModal test submit", () => {
    const rendered = render(
      <>
        <ObjectModelCompeonent addKeyRequest inputValue="obj1" />
      </>,
    );
    const keyModalSubmitElem =
      rendered.container.querySelectorAll(".key-modal-submit");

    expect(keyModalSubmitElem).toHaveLength(1);
    fireEvent(
      keyModalSubmitElem[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    const keyModalRequestElem =
      rendered.container.querySelectorAll(".key-modal-request");
    expect(keyModalRequestElem).toHaveLength(0);
  });

  it("ObjectKeyModal simulate modal close click", () => {
    const rendered = render(
      <>
        <ObjectModelCompeonent addKeyRequest inputValue="obj1" />
      </>,
    );
    const keyModalCancelElem =
      rendered.container.querySelectorAll(".key-modal-cancel");

    expect(keyModalCancelElem).toHaveLength(1);
    fireEvent(
      keyModalCancelElem[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    const keyModalRequestElem =
      rendered.container.querySelectorAll(".key-modal-request");
    expect(keyModalRequestElem).toHaveLength(0);
  });

  it("ObjectKeyModal non-Enter key press", () => {
    const rendered = render(
      <>
        <ObjectModelCompeonent addKeyRequest inputValue="obj1" />
      </>,
    );
    const keyModalInputElem =
      rendered.container.querySelectorAll(".key-modal-input");

    expect(keyModalInputElem).toHaveLength(1);
    fireEvent.keyPress(keyModalInputElem[0], {
      key: "KeyA",
      keyCode: 65,
    });
    const keyModalRequestElem =
      rendered.container.querySelectorAll(".key-modal-request");
    expect(keyModalRequestElem).toHaveLength(1);
  });

  it("ObjectKeyModal submit with Enter key press", () => {
    const rendered = render(
      <>
        <ObjectModelCompeonent addKeyRequest inputValue="obj1" />
      </>,
    );
    const keyModalInputElem =
      rendered.container.querySelectorAll(".key-modal-input");

    expect(keyModalInputElem).toHaveLength(1);
    fireEvent.keyUp(keyModalInputElem[0], {
      key: "Enter",
      keyCode: 13,
    });

    const keyModalRequestElem =
      rendered.container.querySelectorAll(".key-modal-request");
    expect(keyModalRequestElem).toHaveLength(0);
  });

  it("ObjectKeyModal close with Escape", () => {
    const rendered = render(
      <>
        <ObjectModelCompeonent addKeyRequest inputValue="obj1" />
      </>,
    );
    const keyModalInputElem =
      rendered.container.querySelectorAll(".key-modal-input");

    expect(keyModalInputElem).toHaveLength(1);
    fireEvent.keyUp(keyModalInputElem[0], {
      key: "Escape",
      keyCode: 27,
    });

    const keyModalRequestElem =
      rendered.container.querySelectorAll(".key-modal-request");
    expect(keyModalRequestElem).toHaveLength(0);
  });
});
