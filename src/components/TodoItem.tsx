"use client";

import type { ReactNode } from "react";
import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  isSelected: boolean;
  isDarkMode: boolean;
  onSelect: (todoId: number, checked: boolean) => void;
  onToggle: (todo: Todo) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M4.5 10.5 8 14l7.5-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UndoIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M7.5 6H4v3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 9.5A6 6 0 1 0 6 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconButton({ children, label, className, onClick }: { children: ReactNode; label: string; className: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition ${className}`}
    >
      {children}
    </button>
  );
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
      <IconButton
        label={todo.completed ? `Mark ${todo.title} incomplete` : `Mark ${todo.title} complete`}
        onClick={() => onToggle(todo)}
        className={
          isDarkMode
            ? "border-sky-800 text-sky-300 hover:bg-sky-950"
            : "border-sky-200 text-sky-700 hover:bg-sky-50"
        }
      >
        {todo.completed ? <UndoIcon /> : <CheckIcon />}
      </IconButton>
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
