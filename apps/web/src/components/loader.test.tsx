import { describe, expect, test } from "bun:test";
import { render } from "@testing-library/react";
import Loader from "./loader";

describe("Loader", () => {
  test("renders a spinning icon", () => {
    const { container } = render(<Loader />);

    const spinner = container.querySelector("svg");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
  });
});
