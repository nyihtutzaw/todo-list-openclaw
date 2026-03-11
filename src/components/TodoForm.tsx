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
    <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="todo-title">
        Todo title
      </label>
      <input
        id="todo-title"
        name="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add a new task"
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-0 transition focus:border-sky-500"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-sky-300"
      >
        {isSubmitting ? "Adding..." : "Add todo"}
      </button>
      {error ? <p className="text-sm text-rose-600 sm:basis-full">{error}</p> : null}
    </form>
  );
}
