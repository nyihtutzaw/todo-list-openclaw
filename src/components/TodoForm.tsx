"use client";

import { FormEvent, useState } from "react";

interface TodoFormProps {
  onAddTodo: (title: string) => Promise<void>;
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Please enter a todo title.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onAddTodo(trimmedTitle);
      setTitle("");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to add todo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="todo-title">
        Todo title
      </label>
      <input
        id="todo-title"
        name="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={isSubmitting ? "Adding..." : "Add a new task"}
        disabled={isSubmitting}
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-0 transition focus:border-sky-500 disabled:cursor-not-allowed disabled:bg-slate-100"
      />
      <p className="text-sm text-slate-500">Press Enter to add a new todo.</p>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </form>
  );
}
