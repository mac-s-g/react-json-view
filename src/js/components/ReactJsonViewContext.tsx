import { createContext, StyleHTMLAttributes } from "react";

import { UserTheme } from "../helpers/theme";

export type Json =
  | number
  | string
  | null
  | boolean
  | Array<Json>
  | { [key: string]: Json };

export type ReactJsonViewProps = {
  value: Json & object;
  onChange: (v: Json & object) => void | boolean;
  rootNodeName: string | null;
  theme: UserTheme;
  style: StyleHTMLAttributes<"div">;
  newKeyDefaultValue?: string | null;
  validationMessage: string;
  collapseStringsAfterLength: number;
  sortKeys: boolean;
  shouldCollapse: (p: { value: Json; depth: number }) => boolean;
  quotesOnKeys: boolean;
  groupArraysAfterLength: number;
  indentWidth: number;
  enableClipboard: boolean;
  displayDataTypes: boolean;
  displayArrayKey: boolean;
  displayObjectSize: boolean;

  canEdit: boolean;
  canDelete: boolean;
  canAdd: boolean;
  iconStyle: "circle" | "triangle" | "square";
};

export type TypeName =
  | "string"
  | "number"
  | "null"
  | "object"
  | "array"
  | "boolean";

const ReactJsonViewContext = createContext<{
  props: ReactJsonViewProps;
  rjvId: string;
}>(null!);

export default ReactJsonViewContext;
