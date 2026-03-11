"use client";

import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  isSelected: boolean;
  onSelect: (todoId: number, checked: boolean) => void;
  onToggle: (todo: Todo) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TodoItem({ todo, isSelected, onSelect, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <input
        aria-label={`Select ${todo.title}`}
        type="checkbox"
        checked={isSelected}
        onChange={(event) => onSelect(todo.id, event.target.checked)}
        className="h-5 w-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
      />
      <input
        aria-label={`Mark ${todo.title} as ${todo.completed ? "incomplete" : "complete"}`}
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
        className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
      />
      <span className={`flex-1 text-slate-800 ${todo.completed ? "text-slate-400 line-through" : ""}`}>
        {todo.title}
      </span>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="rounded-xl border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
      >
        Delete
      </button>
    </li>
  );
}
