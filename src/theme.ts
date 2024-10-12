const colorNames = {
  "text-primary": "--t-p",
  "text-contrast": "--t-c",
  "bg-primary": "--bg-p",
  "bg-secondary": "--bg-s",
  "border-primary": "--b-p",
  error: "--e",
} as const;
type ColorNames = typeof colorNames;
type ColorName = keyof ColorNames;

const getVariables = () => {
  return Object.fromEntries(
    Object.entries(colorNames).map(([name, value]) => [name, `var(${value})`]),
  ) as { [Name in ColorName]: `var(${ColorNames[Name]})` };
};

export const colors = getVariables();
