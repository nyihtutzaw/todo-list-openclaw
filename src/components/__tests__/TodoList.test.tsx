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
      <TodoList
        todos={[]}
        selectedTodoIds={[]}
        isDarkMode={false}
        onSelectTodo={() => undefined}
        onToggle={async () => undefined}
        onDelete={async () => undefined}
      />,
    );

    expect(html).toContain("No todos yet. Add your first task above.");
  });

  it("renders todo items with one selection checkbox and icon toggle action", () => {
    const html = renderToStaticMarkup(
      <TodoList
        todos={todos}
        selectedTodoIds={[]}
        isDarkMode={false}
        onSelectTodo={() => undefined}
        onToggle={async () => undefined}
        onDelete={async () => undefined}
      />,
    );

    expect(html).toContain("Write documentation");
    expect(html).toContain("Delete");
    expect(html).toContain("aria-label=\"Mark Write documentation complete\"");
    expect(html.match(/type=\"checkbox\"/g)).toHaveLength(1);
    expect(html).toContain("Select Write documentation");
    expect(html).toContain("<svg");
  });

  it("renders completed todos with strike-through styling and incomplete icon action", () => {
    const completedTodo: Todo = {
      ...todos[0],
      completed: true,
    };

    const html = renderToStaticMarkup(
      <TodoItem
        todo={completedTodo}
        isSelected
        isDarkMode
        onSelect={() => undefined}
        onToggle={async () => undefined}
        onDelete={async () => undefined}
      />,
    );

    expect(html).toContain("line-through");
    expect(html).toContain("aria-label=\"Mark Write documentation incomplete\"");
    expect(html).toContain("<svg");
    expect(html.match(/checked=\"\"/g)?.length).toBe(1);
  });
});
