/** @jest-environment node */

import { renderToStaticMarkup } from "react-dom/server";
import { TodoItem } from "@/components/TodoItem";
import { TodoList } from "@/components/TodoList";
import type { Todo } from "@/types/todo";

const todos: Todo[] = [
  {
    id: 1,
    title: "Write documentation",
    completed: false,
    createdAt: "2026-03-11T09:00:00.000Z",
    updatedAt: "2026-03-11T09:00:00.000Z",
  },
];

describe("TodoList", () => {
  it("renders an empty state", () => {
    const html = renderToStaticMarkup(
      <TodoList todos={[]} onToggle={async () => undefined} onDelete={async () => undefined} />,
    );

    expect(html).toContain("No todos yet. Add your first task above.");
  });

  it("renders todo items", () => {
    const html = renderToStaticMarkup(
      <TodoList todos={todos} onToggle={async () => undefined} onDelete={async () => undefined} />,
    );

    expect(html).toContain("Write documentation");
    expect(html).toContain("Delete");
    expect(html).toContain('type="checkbox"');
  });

  it("renders completed todos with strike-through styling", () => {
    const completedTodo: Todo = {
      ...todos[0],
      completed: true,
    };

    const html = renderToStaticMarkup(
      <TodoItem todo={completedTodo} onToggle={async () => undefined} onDelete={async () => undefined} />,
    );

    expect(html).toContain("line-through");
    expect(html).toContain("checked");
  });
});
