import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

// Declaration merging so @testing-library/jest-dom matchers are typed on
// bun:test's `expect`. See https://bun.com/guides/test/testing-library
declare module "bun:test" {
  interface Matchers<T>
    extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  interface AsymmetricMatchers extends TestingLibraryMatchers {}
}
