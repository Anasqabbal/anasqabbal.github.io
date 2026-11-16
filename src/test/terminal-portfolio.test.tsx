import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TerminalPortfolio } from "@/routes/index";

describe("terminal portfolio", () => {
  it("runs a command and lets the user navigate command history", () => {
    render(<TerminalPortfolio />);
    const input = screen.getByRole("textbox", { name: "Terminal command" });

    expect(screen.getByText("/help", { selector: "span" })).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "/" } });
    expect(screen.getByRole("listbox", { name: "Available commands" })).toBeInTheDocument();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(screen.getByRole("option", { name: /\/about/ })).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(screen.getByRole("option", { name: /\/help/ })).toHaveAttribute("aria-selected", "true");
    fireEvent.change(input, { target: { value: "/skills" } });
    fireEvent.click(screen.getByRole("button", { name: "Run command" }));
    expect(screen.getByText("Areas of practice")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "/help" } });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue("/skills");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveValue("/help");
  });

  it("clears the draft with Escape and the output stream with clear", () => {
    render(<TerminalPortfolio />);
    const input = screen.getByRole("textbox", { name: "Terminal command" });

    fireEvent.change(input, { target: { value: "unfinished" } });
    fireEvent.keyDown(input, { key: "Escape" });
    expect(input).toHaveValue("");

    fireEvent.change(input, { target: { value: "/about" } });
    fireEvent.click(screen.getByRole("button", { name: "Run command" }));
    expect(screen.getByText("Anas Qabbal", { selector: "span" })).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "/clear" } });
    fireEvent.click(screen.getByRole("button", { name: "Run command" }));
    expect(screen.queryByText("Anas Qabbal", { selector: "span" })).not.toBeInTheDocument();
  });
});