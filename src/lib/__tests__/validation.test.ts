import { validateBulkDeleteTodos, validateCreateTodo, validateUpdateTodo } from "@/lib/validation";

describe("validation", () => {
  it("trims and validates create input", () => {
    expect(validateCreateTodo({ title: "  Buy milk  " })).toEqual({ title: "Buy milk" });
  });

  it("rejects empty create input", () => {
    expect(() => validateCreateTodo({ title: "   " })).toThrow("Title is required.");
  });

  it("accepts boolean completed updates", () => {
    expect(validateUpdateTodo({ completed: true })).toEqual({ completed: true });
  });

  it("rejects empty update payloads", () => {
    expect(() => validateUpdateTodo({})).toThrow("At least one field is required.");
  });

  it("normalizes bulk delete ids", () => {
    expect(validateBulkDeleteTodos({ ids: [1, "2", 2, 3] })).toEqual({ ids: [1, 2, 3] });
  });

  it("rejects empty bulk delete payloads", () => {
    expect(() => validateBulkDeleteTodos({ ids: [] })).toThrow("Select at least one todo.");
  });
});
