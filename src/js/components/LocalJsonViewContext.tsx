import { createContext } from "react";

import { Json, TypeName } from "./ReactJsonViewContext";

const LocalJsonViewContext = createContext<{
  value: Json;
  namespace: (string | null)[];
  type: TypeName;
  depth: number;
  parentType: TypeName;
  parentObj: Json;
  subArray?: Json;
}>(null!);

export default LocalJsonViewContext;
