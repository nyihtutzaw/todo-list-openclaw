/** @jest-environment node */

import { renderToStaticMarkup } from "react-dom/server";
import { TodoForm } from "@/components/TodoForm";

describe("TodoForm", () => {
  it("renders the input without a visible add button", () => {
    const html = renderToStaticMarkup(<TodoForm onAddTodo={async () => undefined} />);

    expect(html).toContain("Add a new task");
    expect(html).toContain("Press Enter to add a new todo.");
    expect(html).toContain("todo-title");
    expect(html).not.toContain("Add todo");
    expect(html).not.toContain('type="submit"');
  });
});
