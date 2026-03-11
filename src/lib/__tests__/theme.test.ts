import { getNextTheme, resolveInitialTheme } from "@/lib/theme";

describe("theme helpers", () => {
  it("uses a stored theme when available", () => {
    expect(resolveInitialTheme("dark", false)).toBe("dark");
    expect(resolveInitialTheme("light", true)).toBe("light");
  });

  it("falls back to system preference when there is no stored theme", () => {
    expect(resolveInitialTheme(null, true)).toBe("dark");
    expect(resolveInitialTheme(null, false)).toBe("light");
  });

  it("toggles between light and dark themes", () => {
    expect(getNextTheme("light")).toBe("dark");
    expect(getNextTheme("dark")).toBe("light");
  });
});
