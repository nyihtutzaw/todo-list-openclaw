export function addOrRemoveSelectedTodo(
  currentIds: number[],
  todoId: number,
  checked: boolean,
): number[] {
  if (checked) {
    return currentIds.includes(todoId) ? currentIds : [...currentIds, todoId];
  }

  return currentIds.filter((id) => id !== todoId);
}

export function removeDeletedTodos(currentIds: number[], deletedIds: number[]): number[] {
  return currentIds.filter((id) => !deletedIds.includes(id));
}
