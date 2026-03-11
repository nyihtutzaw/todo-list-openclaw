"use client";

import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  isSelected: boolean;
  isDarkMode: boolean;
  onSelect: (todoId: number, checked: boolean) => void;
  onToggle: (todo: Todo) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TodoItem({ todo, isSelected, isDarkMode, onSelect, onToggle, onDelete }: TodoItemProps) {
  return (
    <li
      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm transition ${
        isDarkMode ? "border-slate-800 bg-slate-900 text-slate-100" : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      <input
        aria-label={`Select ${todo.title}`}
        type="checkbox"
        checked={isSelected}
        onChange={(event) => onSelect(todo.id, event.target.checked)}
        className="h-5 w-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
      />
      <span className={`flex-1 ${todo.completed ? "text-slate-400 line-through" : isDarkMode ? "text-slate-100" : "text-slate-800"}`}>
        {todo.title}
      </span>
      <button
        type="button"
        onClick={() => onToggle(todo)}
        className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
          isDarkMode
            ? "border-sky-800 text-sky-300 hover:bg-sky-950"
            : "border-sky-200 text-sky-700 hover:bg-sky-50"
        }`}
      >
        {todo.completed ? "Mark incomplete" : "Mark complete"}
      </button>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
          isDarkMode
            ? "border-rose-800 text-rose-300 hover:bg-rose-950"
            : "border-rose-200 text-rose-600 hover:bg-rose-50"
        }`}
      >
        Delete
      </button>
    </li>
  );
}
