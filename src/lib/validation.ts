import type { CreateTodoInput, UpdateTodoInput } from "@/types/todo";

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
