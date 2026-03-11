"use client";

import { useEffect, useMemo, useState } from "react";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { createTodo, deleteManyTodos, deleteTodo, updateTodo } from "@/lib/todoApi";
import { getNextTheme, resolveInitialTheme, type Theme } from "@/lib/theme";
import { addOrRemoveSelectedTodo, removeDeletedTodos } from "@/lib/todoSelection";
import type { Todo } from "@/types/todo";

interface TodoAppProps {
  initialTodos: Todo[];
}

export function TodoApp({ initialTodos }: TodoAppProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [selectedTodoIds, setSelectedTodoIds] = useState<number[]>([]);
  const [isDeletingSelected, setIsDeletingSelected] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = window.localStorage.getItem("todo-theme");
    setTheme(resolveInitialTheme(storedTheme, prefersDark));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("todo-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const summary = useMemo(() => {
    const completedCount = todos.filter((todo) => todo.completed).length;

    return {
      total: todos.length,
      completed: completedCount,
      remaining: todos.length - completedCount,
    };
  }, [todos]);

  const isDarkMode = theme === "dark";
  const selectedCount = selectedTodoIds.length;

  const handleAddTodo = async (title: string) => {
    const newTodo = await createTodo(title);
    setTodos((currentTodos) => [newTodo, ...currentTodos]);
    setError(null);
  };

  const handleToggleTodo = async (todo: Todo) => {
    const updatedTodo = await updateTodo(todo.id, { completed: !todo.completed });

    setTodos((currentTodos) =>
      currentTodos.map((currentTodo) =>
        currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo,
      ),
    );
    setError(null);
  };

  const handleSelectTodo = (todoId: number, checked: boolean) => {
    setSelectedTodoIds((currentIds) => addOrRemoveSelectedTodo(currentIds, todoId, checked));
  };

  const handleClearSelection = () => {
    setSelectedTodoIds([]);
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
      setSelectedTodoIds((currentIds) => removeDeletedTodos(currentIds, [id]));
      setError(null);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete todo.");
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedTodoIds.length === 0) {
      return;
    }

    try {
      setIsDeletingSelected(true);
      const { ids } = await deleteManyTodos(selectedTodoIds);

      setTodos((currentTodos) => currentTodos.filter((todo) => !ids.includes(todo.id)));
      setSelectedTodoIds((currentIds) => removeDeletedTodos(currentIds, ids));
      setError(null);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete selected todos.");
    } finally {
      setIsDeletingSelected(false);
    }
  };

  return (
    <div
      className={`space-y-6 rounded-[2rem] border p-6 shadow-2xl transition-colors sm:p-8 ${
        isDarkMode ? "border-slate-800 bg-slate-950 text-slate-100" : "border-white/70 bg-white/70 text-slate-900"
      }`}
    >
      <div className={`rounded-3xl p-6 shadow-xl ${isDarkMode ? "bg-slate-900 text-white" : "bg-slate-900 text-white"}`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Todo List</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Stay on top of your day</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
              Add tasks, mark them complete, and clear finished work with a simple staging-ready app.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setTheme((currentTheme) => getNextTheme(currentTheme))}
            className={`rounded-2xl border px-4 py-2 text-sm font-medium transition ${
              isDarkMode
                ? "border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700"
                : "border-white/30 bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Switch to {isDarkMode ? "light" : "dark"} mode
          </button>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-sm text-slate-300">Total</p>
            <p className="text-2xl font-semibold">{summary.total}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-sm text-slate-300">Remaining</p>
            <p className="text-2xl font-semibold">{summary.remaining}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-sm text-slate-300">Completed</p>
            <p className="text-2xl font-semibold">{summary.completed}</p>
          </div>
        </div>
      </div>

      <div
        className={`rounded-3xl border p-6 shadow-lg backdrop-blur ${
          isDarkMode ? "border-slate-800 bg-slate-900/95" : "border-slate-200 bg-white/90"
        }`}
      >
        <TodoForm onAddTodo={handleAddTodo} isDarkMode={isDarkMode} />
        {selectedCount > 0 ? (
          <div
            className={`mt-4 flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
              isDarkMode ? "border-rose-900 bg-rose-950/60" : "border-rose-200 bg-rose-50"
            }`}
          >
            <p className={`text-sm font-medium ${isDarkMode ? "text-rose-200" : "text-rose-900"}`}>
              {selectedCount} todo{selectedCount === 1 ? "" : "s"} selected
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleClearSelection}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  isDarkMode
                    ? "border-slate-700 text-slate-200 hover:bg-slate-800"
                    : "border-slate-300 text-slate-700 hover:bg-white"
                }`}
              >
                Clear selection
              </button>
              <button
                type="button"
                onClick={handleDeleteSelected}
                disabled={isDeletingSelected}
                className="rounded-xl border border-rose-300 bg-rose-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeletingSelected ? "Deleting..." : `Delete selected (${selectedCount})`}
              </button>
            </div>
          </div>
        ) : null}
        {error ? <p className="mt-3 text-sm text-rose-500">{error}</p> : null}
      </div>

      <TodoList
        todos={todos}
        selectedTodoIds={selectedTodoIds}
        isDarkMode={isDarkMode}
        onSelectTodo={handleSelectTodo}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}
