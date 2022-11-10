import { createContext } from "react";

import { Json } from "./ReactJsonViewContext";

const LocalJsonViewContext = createContext<{
  value: Json;
  namespace: string[];
  type: string;
}>(null!);

export default LocalJsonViewContext;
