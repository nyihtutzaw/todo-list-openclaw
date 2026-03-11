/** @jest-environment node */

import { renderToStaticMarkup } from "react-dom/server";
import { TodoForm } from "@/components/TodoForm";

describe("TodoForm", () => {
  it("renders the input and submit button", () => {
    const html = renderToStaticMarkup(<TodoForm onAddTodo={async () => undefined} />);

    expect(html).toContain("Add a new task");
    expect(html).toContain("Add todo");
    expect(html).toContain("todo-title");
  });
});
