import { createContext } from "react";

import { Json, TypeName } from "./ReactJsonViewContext";

const LocalJsonViewContext = createContext<{
  value: Json;
  namespace: (string | null)[];
  type: TypeName;
  depth: number;
  parentType: TypeName;
}>(null!);

export default LocalJsonViewContext;
