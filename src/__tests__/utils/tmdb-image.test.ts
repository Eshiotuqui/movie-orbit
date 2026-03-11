import { tmdbImage } from "@/utils/tmdb-image";

describe("tmdbImage", () => {
  it("returns null when path is null", () => {
    expect(tmdbImage(null)).toBeNull();
  });

  it("returns null when path is empty string", () => {
    expect(tmdbImage("")).toBeNull();
  });

  it("builds URL with default size w500", () => {
    expect(tmdbImage("/abc123.jpg")).toBe("https://image.tmdb.org/t/p/w500/abc123.jpg");
  });

  it("builds URL with custom size w300", () => {
    expect(tmdbImage("/poster.jpg", "w300")).toBe("https://image.tmdb.org/t/p/w300/poster.jpg");
  });

  it("builds URL with original size", () => {
    expect(tmdbImage("/backdrop.jpg", "original")).toBe(
      "https://image.tmdb.org/t/p/original/backdrop.jpg",
    );
  });

  it("builds URL with w92 size", () => {
    expect(tmdbImage("/small.jpg", "w92")).toBe("https://image.tmdb.org/t/p/w92/small.jpg");
  });
});