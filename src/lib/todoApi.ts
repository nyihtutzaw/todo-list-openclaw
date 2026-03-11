import type { Todo, UpdateTodoInput } from "@/types/todo";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const data = (await response.json().catch(() => ({ error: "Request failed." }))) as {
      error?: string;
    };

    throw new Error(data.error ?? "Request failed.");
  }

  return (await response.json()) as T;
}

export async function createTodo(title: string): Promise<Todo> {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return parseResponse<Todo>(response);
}

export async function updateTodo(id: number, data: UpdateTodoInput): Promise<Todo> {
  const response = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return parseResponse<Todo>(response);
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`/api/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({ error: "Request failed." }))) as {
      error?: string;
    };

    throw new Error(data.error ?? "Request failed.");
  }
}
