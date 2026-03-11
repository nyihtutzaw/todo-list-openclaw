"use client";

import type { Todo } from "@/types/todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  selectedTodoIds: number[];
  isDarkMode: boolean;
  onSelectTodo: (todoId: number, checked: boolean) => void;
  onToggle: (todo: Todo) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TodoList({
  todos,
  selectedTodoIds,
  isDarkMode,
  onSelectTodo,
  onToggle,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div
        className={`rounded-2xl border border-dashed p-8 text-center shadow-sm ${
          isDarkMode ? "border-slate-700 bg-slate-900 text-slate-400" : "border-slate-300 bg-white/80 text-slate-500"
        }`}
      >
        No todos yet. Add your first task above.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isSelected={selectedTodoIds.includes(todo.id)}
          isDarkMode={isDarkMode}
          onSelect={onSelectTodo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
