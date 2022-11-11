export default (value: string | null | boolean | number) => {
  if (value === null) return "null";
  return value.toString();
};
