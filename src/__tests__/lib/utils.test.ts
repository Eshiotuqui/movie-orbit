import { cn } from "@/lib/utils";

describe("cn", () => {
  it("returns a single class name unchanged", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("merges multiple class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("ignores falsy values", () => {
    expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar");
  });

  it("resolves tailwind conflicts (last wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("handles conditional classes", () => {
    const active = true;
    expect(cn("base", active && "active")).toBe("base active");
    expect(cn("base", !active && "active")).toBe("base");
  });

  it("returns empty string when no valid classes are provided", () => {
    expect(cn(undefined, null, false)).toBe("");
  });
});