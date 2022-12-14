import { useContext, useRef, useState } from "react";

import parseInput from "../helpers/parseInput";
import stringifyVariable from "../helpers/stringifyVariable";
import attributeStore from "../stores/ObjectAttributes";
import LocalJsonViewContext from "./LocalJsonViewContext";
import ReactJsonViewContext from "./ReactJsonViewContext";

type EditState = { editMode: false } | { editMode: true; editValue: string };

const useEditState = () => {
  const [edit, setEdit] = useState<EditState>({ editMode: false });

  const {
    props: { canEdit, onChange },
    rjvId,
  } = useContext(ReactJsonViewContext);

  const { namespace, value } = useContext(LocalJsonViewContext);
  const name = namespace.at(-1);

  const enterEditMode = () => {
    if (canEdit) {
      const stringifiedValue = stringifyVariable(
        value as number | string | boolean | null,
      );

      setEdit({
        editMode: true,
        editValue: stringifiedValue,
      });
    }
  };

  const submitEdit = (submitDetected?: boolean) => {
    const newValue =
      edit.editMode &&
      (submitDetected ? parseInput(edit.editValue).value : edit.editValue);

    setEdit({ editMode: false });

    const data = {
      name,
      namespace,
      existingValue: value,
      newValue,
      updatedSrc: {},
      variableRemoved: false,
    };

    attributeStore.handleAction({
      name: "VARIABLE_UPDATED",
      rjvId,
      data,
    });
    onChange(data.updatedSrc);
  };

  return { edit, setEdit, enterEditMode, submitEdit };
};

export default useEditState;
