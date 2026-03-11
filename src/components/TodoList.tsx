"use client";

import type { Todo } from "@/types/todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  selectedTodoIds: number[];
  onSelectTodo: (todoId: number, checked: boolean) => void;
  onToggle: (todo: Todo) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TodoList({ todos, selectedTodoIds, onSelectTodo, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-500 shadow-sm">
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
          onSelect={onSelectTodo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
