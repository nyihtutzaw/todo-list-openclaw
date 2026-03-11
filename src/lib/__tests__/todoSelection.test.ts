import { addOrRemoveSelectedTodo, removeDeletedTodos } from "@/lib/todoSelection";

describe("todoSelection", () => {
  it("adds a todo id when selected", () => {
    expect(addOrRemoveSelectedTodo([1], 2, true)).toEqual([1, 2]);
  });

  it("does not duplicate an already-selected todo id", () => {
    expect(addOrRemoveSelectedTodo([1, 2], 2, true)).toEqual([1, 2]);
  });

  it("removes a todo id when unselected", () => {
    expect(addOrRemoveSelectedTodo([1, 2, 3], 2, false)).toEqual([1, 3]);
  });

  it("removes deleted todo ids from the current selection", () => {
    expect(removeDeletedTodos([1, 2, 3], [2, 3])).toEqual([1]);
  });
});
