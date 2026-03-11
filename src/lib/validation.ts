import type { BulkDeleteTodosInput, CreateTodoInput, UpdateTodoInput } from "@/types/todo";

export function validateCreateTodo(input: unknown): CreateTodoInput {
  const title =
    typeof input === "object" && input !== null && "title" in input
      ? String((input as { title: unknown }).title).trim()
      : "";

  if (!title) {
    throw new Error("Title is required.");
  }

  if (title.length > 255) {
    throw new Error("Title must be 255 characters or fewer.");
  }

  return { title };
}

export function validateUpdateTodo(input: unknown): UpdateTodoInput {
  if (typeof input !== "object" || input === null) {
    throw new Error("Invalid request body.");
  }

  const result: UpdateTodoInput = {};

  if ("title" in input) {
    const title = String((input as { title: unknown }).title).trim();

    if (!title) {
      throw new Error("Title is required.");
    }

    if (title.length > 255) {
      throw new Error("Title must be 255 characters or fewer.");
    }

    result.title = title;
  }

  if ("completed" in input) {
    const completed = (input as { completed: unknown }).completed;

    if (typeof completed !== "boolean") {
      throw new Error("Completed must be a boolean.");
    }

    result.completed = completed;
  }

  if (Object.keys(result).length === 0) {
    throw new Error("At least one field is required.");
  }

  return result;
}

export function validateBulkDeleteTodos(input: unknown): BulkDeleteTodosInput {
  if (typeof input !== "object" || input === null || !("ids" in input)) {
    throw new Error("Todo ids are required.");
  }

  const ids = (input as { ids: unknown }).ids;

  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("Select at least one todo.");
  }

  const normalizedIds = [...new Set(ids.map((id) => Number(id)))];

  if (normalizedIds.some((id) => !Number.isInteger(id) || id <= 0)) {
    throw new Error("Todo ids must be positive integers.");
  }

  return { ids: normalizedIds };
}
