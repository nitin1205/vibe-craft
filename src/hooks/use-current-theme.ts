import { useTheme } from "next-themes";

export const useCurrentTheme = () => {
  const { theme, systemTheme } = useTheme();

  if (theme === "drak" || theme === "light") {
    return theme;
  }

  return systemTheme;
};
