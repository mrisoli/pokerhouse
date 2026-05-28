import { afterEach, expect } from "bun:test";
// biome-ignore lint/performance/noNamespaceImport: jest-dom exposes matchers only as a namespace for expect.extend
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
