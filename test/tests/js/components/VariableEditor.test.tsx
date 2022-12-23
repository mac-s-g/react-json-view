import "@testing-library/jest-dom";

import { fireEvent, render } from "@testing-library/react";
import { act, cleanup, renderHook } from "@testing-library/react-hooks";
import React, { useEffect } from "react";

import LocalJsonViewContext from "@/js/components/LocalJsonViewContext";
import ReactJsonViewContext from "@/js/components/ReactJsonViewContext";
import useEditState from "@/js/components/useEditState";
import VariableEditor from "@/js/components/VariableEditor";
import attributeStore from "@/js/stores/ObjectAttributes";

describe("<VariableEditor />", () => {
  afterEach(() => {
    cleanup();
  });

  it("VariableEditor click-to-edit should be visible", () => {
    const rjvId = "id";

    render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              canEdit: true,
              canDelete: true,
              enableClipboard: true,
              theme: "rjvDefault",
              indentWidth: 4,
              quotesOnKeys: true,
              displayArrayKey: true,
            },
            rjvId,
          } as any
        }
      >
        {" "}
        <LocalJsonViewContext.Provider
          value={
            {
              value: "test",
              namespace: ["name"],
              parentType: "object",
            } as any
          }
        >
          <VariableEditor />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const clickEditClass = document.querySelectorAll(
      ".variable-value ~ .click-to-edit",
    );
    expect(clickEditClass).toHaveLength(1);
  });

  it("VariableEditor click-to-edit should be hidden when onEdit disabled", () => {
    const rjvId = "id";

    render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              canEdit: false,
              canDelete: true,
              enableClipboard: true,
              theme: "rjvDefault",
              indentWidth: 4,
              quotesOnKeys: true,
              displayArrayKey: true,
            },
            rjvId,
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={
            {
              value: "test",
              namespace: ["name"],
              parentType: "object",
            } as any
          }
        >
          <VariableEditor />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const clickEditClass = document.querySelectorAll(
      ".variable-value ~ .click-to-edit",
    );
    expect(clickEditClass).toHaveLength(0);
  });

  it("VariableEditor click-to-edit should be hidden when editMode is active", () => {
    const rjvId = "id";

    render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              canEdit: true,
              canDelete: true,
              enableClipboard: true,
              theme: "rjvDefault",
              indentWidth: 4,
              quotesOnKeys: true,
              displayArrayKey: true,
            },
            rjvId,
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={
            {
              value: "test",
              namespace: ["name"],
              parentType: "object",
            } as any
          }
        >
          <VariableEditor />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const clickToEditIconElement = document.querySelector(
      ".variable-value ~ .click-to-edit .click-to-edit-icon",
    )!;
    fireEvent(
      clickToEditIconElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );
    const clickEditClass = document.querySelectorAll(
      ".variable-value ~ .click-to-edit",
    );

    expect(clickEditClass).toHaveLength(0);
  });

  it("VariableEditor test textarea and cancel icon", () => {
    const rjvId = "id";

    render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              canEdit: true,
              canDelete: true,
              enableClipboard: true,
              theme: "rjvDefault",
              indentWidth: 4,
              quotesOnKeys: true,
              displayArrayKey: true,
            },
            rjvId,
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={
            {
              value: "test",
              namespace: ["name"],
              parentType: "object",
            } as any
          }
        >
          <VariableEditor />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const clickToEditIconElement = document.querySelector(
      ".variable-value ~ .click-to-edit .click-to-edit-icon",
    )!;
    expect(clickToEditIconElement).toBeInTheDocument();
    fireEvent(
      clickToEditIconElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );
    let variableEditorElement = document.querySelectorAll(
      ".variable-value .variable-editor",
    );
    expect(variableEditorElement.length).toBe(1);

    const editCancelElement = document.querySelector(".edit-cancel")!;
    fireEvent(
      editCancelElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );
    variableEditorElement = document.querySelectorAll(
      ".variable-value .variable-editor",
    );
    expect(variableEditorElement.length).toBe(0);
  });

  it("VariableEditor test edit state and submit function", () => {
    const existingValue = "existingValue";
    const newValue = "newValue";

    const rjvId = "id";

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      useEffect(() => {
        attributeStore.set(rjvId, "global", "src", { name: "test" });
      });

      return (
        <>
          <ReactJsonViewContext.Provider
            value={
              {
                props: {
                  canEdit: true,
                  canDelete: true,
                  enableClipboard: true,
                  theme: "rjvDefault",
                  indentWidth: 4,
                  quotesOnKeys: true,
                  displayArrayKey: true,
                  onChange: (value: any) => {
                    expect((value as { name: string }).name).toBe("newValue");
                  },
                },
                rjvId,
              } as any
            }
          >
            <LocalJsonViewContext.Provider
              value={
                {
                  value: existingValue,
                  namespace: ["name"],
                  parentType: "object",
                } as any
              }
            >
              <div>
                {children}
                <VariableEditor />
              </div>
            </LocalJsonViewContext.Provider>
          </ReactJsonViewContext.Provider>
        </>
      );
    };

    const { result } = renderHook(() => useEditState(), { wrapper });

    // editMode defaults to off
    expect(result.current.edit.editMode).toBe(false);

    // click to open textarea
    act(() => {
      result.current.enterEditMode();
    });

    // verify editMode is on
    expect(result.current.edit.editMode).toBe(true);

    // make sure default editValue is correct
    expect(
      (result.current.edit as { editMode: boolean; editValue: string })
        .editValue,
    ).toBe("existingValue");

    // update edit value
    act(() => {
      result.current.setEdit({ editMode: true, editValue: newValue });
    });

    // submit new value
    act(() => {
      result.current.submitEdit();
    });

    // make sure editMode is off after submit
    expect(result.current.edit.editMode).toBe(false);
  });

  it("VariableEditor edit after value change should respect current value", () => {
    const existingValue = "existingValue";
    const newValue = "newValue";

    const rjvId = "id";

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      useEffect(() => {
        attributeStore.set(rjvId, "global", "src", { name: "test" });
      });

      return (
        <>
          <ReactJsonViewContext.Provider
            value={
              {
                props: {
                  canEdit: true,
                  canDelete: true,
                  enableClipboard: true,
                  theme: "rjvDefault",
                  indentWidth: 4,
                  quotesOnKeys: true,
                  displayArrayKey: true,
                  onChange: (value: any) => {
                    expect((value as { name: string }).name).toBe("newValue");
                  },
                },
                rjvId,
              } as any
            }
          >
            <LocalJsonViewContext.Provider
              value={
                {
                  value: existingValue,
                  namespace: ["name"],
                  parentType: "object",
                } as any
              }
            >
              <div>
                {children}
                <VariableEditor />
              </div>
            </LocalJsonViewContext.Provider>
          </ReactJsonViewContext.Provider>
        </>
      );
    };

    const { result } = renderHook(() => useEditState(), { wrapper });

    // editMode defaults to off
    expect(result.current.edit.editMode).toBe(false);

    // open textarea
    act(() => {
      result.current.enterEditMode();
    });

    // verify editMode is on
    expect(result.current.edit.editMode).toBe(true);

    // make sure default editValue is correct
    expect(
      (result.current.edit as { editMode: boolean; editValue: string })
        .editValue,
    ).toBe("existingValue");

    // update edit value
    act(() => {
      result.current.setEdit({ editMode: true, editValue: newValue });
    });

    // cancel update
    act(() => {
      result.current.setEdit({ editMode: false });
    });

    // make sure editMode is off after cancel
    expect(result.current.edit.editMode).toBe(false);

    // open textarea again
    act(() => {
      result.current.enterEditMode();
    });

    // make sure editMode is on
    expect(result.current.edit.editMode).toBe(true);

    // make sure that editValue still contains original value
    expect(
      (result.current.edit as { editMode: boolean; editValue: string })
        .editValue,
    ).toBe("existingValue");
  });

  it("VariableEditor detected null", () => {
    const rjvId = "id";

    render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              canEdit: true,
              canDelete: true,
              enableClipboard: true,
              theme: "rjvDefault",
              indentWidth: 4,
              quotesOnKeys: true,
              displayArrayKey: true,
            },
            rjvId,
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={
            {
              value: null,
              namespace: ["name"],
              parentType: "object",
            } as any
          }
        >
          <VariableEditor />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const clickToEditIconElement = document.querySelector(
      ".variable-value ~ .click-to-edit .click-to-edit-icon",
    )!;
    expect(clickToEditIconElement).toBeInTheDocument();
    fireEvent(
      clickToEditIconElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );
    const variableEditorElement = document.querySelectorAll(
      ".variable-value .variable-editor",
    );
    expect(variableEditorElement.length).toBe(1);
    expect((variableEditorElement[0] as HTMLTextAreaElement).value).toBe(
      "null",
    );
    // const wrapper = shallow(
    //   <VariableEditor
    //     src={{ test: true }}
    //     theme="rjv-default"
    //     onEdit={(edit) => {}}
    //     rjvId={rjvId}
    //     variable={{
    //       name: "test",
    //       value: "null",
    //       type: "null",
    //     }}
    //   />,
    // );
    // expect(wrapper.find(".click-to-edit-icon").length).toBe(1);
    // wrapper.find(".click-to-edit-icon").simulate("click");
    // expect(wrapper.state("editMode")).toBe(true);
    // expect(wrapper.find(".variable-editor").props().value).toBe("null");
  });

  it("VariableEditor detected NaN", () => {
    const rjvId = "id";

    render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              canEdit: true,
              canDelete: true,
              enableClipboard: true,
              theme: "rjvDefault",
              indentWidth: 4,
              quotesOnKeys: true,
              displayArrayKey: true,
            },
            rjvId,
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={
            {
              value: NaN,
              namespace: ["name"],
              parentType: "object",
            } as any
          }
        >
          <VariableEditor />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const clickToEditIconElement = document.querySelector(
      ".variable-value ~ .click-to-edit .click-to-edit-icon",
    )!;
    expect(clickToEditIconElement).toBeInTheDocument();
    fireEvent(
      clickToEditIconElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );
    const variableEditorElement = document.querySelectorAll(
      ".variable-value .variable-editor",
    );
    expect(variableEditorElement.length).toBe(1);
    expect((variableEditorElement[0] as HTMLTextAreaElement).value).toBe("NaN");
  });

  it("VariableEditor detected string", () => {
    const rjvId = "id";

    render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              canEdit: true,
              canDelete: true,
              enableClipboard: true,
              theme: "rjvDefault",
              indentWidth: 4,
              quotesOnKeys: true,
              displayArrayKey: true,
            },
            rjvId,
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={
            {
              value: "test",
              namespace: ["name"],
              parentType: "object",
            } as any
          }
        >
          <VariableEditor />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const clickToEditIconElement = document.querySelector(
      ".variable-value ~ .click-to-edit .click-to-edit-icon",
    )!;
    expect(clickToEditIconElement).toBeInTheDocument();
    fireEvent(
      clickToEditIconElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );
    const variableEditorElement = document.querySelectorAll(
      ".variable-value .variable-editor",
    );
    expect(variableEditorElement.length).toBe(1);
    expect((variableEditorElement[0] as HTMLTextAreaElement).value).toBe(
      "test",
    );
  });

  it("VariableEditor detected object", () => {
    const rjvId = "id";

    render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              canEdit: true,
              canDelete: true,
              enableClipboard: true,
              theme: "rjvDefault",
              indentWidth: 4,
              quotesOnKeys: true,
              displayArrayKey: true,
            },
            rjvId,
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={
            {
              value: "{}",
              namespace: ["name"],
              parentType: "object",
            } as any
          }
        >
          <VariableEditor />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const clickToEditIconElement = document.querySelector(
      ".variable-value ~ .click-to-edit .click-to-edit-icon",
    )!;
    expect(clickToEditIconElement).toBeInTheDocument();
    fireEvent(
      clickToEditIconElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );
    const variableEditorElement = document.querySelectorAll(
      ".variable-value .variable-editor",
    );
    expect(variableEditorElement.length).toBe(1);
    expect((variableEditorElement[0] as HTMLTextAreaElement).value).toBe("{}");
  });

  it("VariableEditor detected array", () => {
    const rjvId = "id";

    render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              canEdit: true,
              canDelete: true,
              enableClipboard: true,
              theme: "rjvDefault",
              indentWidth: 4,
              quotesOnKeys: true,
              displayArrayKey: true,
            },
            rjvId,
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={
            {
              value: "[1,2,3]",
              namespace: ["name"],
              parentType: "object",
            } as any
          }
        >
          <VariableEditor />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const clickToEditIconElement = document.querySelector(
      ".variable-value ~ .click-to-edit .click-to-edit-icon",
    )!;
    expect(clickToEditIconElement).toBeInTheDocument();
    fireEvent(
      clickToEditIconElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );
    const variableEditorElement = document.querySelectorAll(
      ".variable-value .variable-editor",
    );
    expect(variableEditorElement.length).toBe(1);
    expect((variableEditorElement[0] as HTMLTextAreaElement).value).toBe(
      "[1,2,3]",
    );
  });
});
