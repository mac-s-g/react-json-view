import { Json, TypeName } from "../components/ReactJsonViewContext";
import { Theme } from "./theme";

export function toType(obj: Json): TypeName {
  const t = typeof obj;

  if (obj === null) return "null";
  if (Array.isArray(obj)) return "array";
  if (t === "boolean") return "boolean";
  if (t === "string") return "string";
  if (t === "number") return "number";
  if (t === "object") return "object";

  throw new Error("Object isn't Json");
}

// validation for base-16 themes
export function isTheme(theme: unknown): theme is Theme {
  const themeKeys = [
    "base00",
    "base01",
    "base02",
    "base03",
    "base04",
    "base05",
    "base06",
    "base07",
    "base08",
    "base09",
    "base0A",
    "base0B",
    "base0C",
    "base0D",
    "base0E",
    "base0F",
  ];
  if (typeof theme === "object" && theme) {
    for (let i = 0; i < themeKeys.length; i += 1) {
      if (!(themeKeys[i] in theme)) {
        return false;
      }
    }
    return true;
  }
  return false;
}

// increment 1 with each nested object & array
export const DEPTH_INCREMENT = 1;
// single indent is 5px
export const SINGLE_INDENT = 5;

export const DISPLAY_BRACES = {
  array: {
    start: "[",
    end: "]",
  },
  object: {
    start: "{",
    end: "}",
  },
  doubleQuotes: {
    start: '"',
    end: '"',
  },
} as const;
