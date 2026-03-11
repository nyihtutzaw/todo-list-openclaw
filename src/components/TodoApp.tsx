"use client";

import { useMemo, useState } from "react";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { createTodo, deleteTodo, updateTodo } from "@/lib/todoApi";
import type { Todo } from "@/types/todo";

interface TodoAppProps {
  initialTodos: Todo[];
}

export function TodoApp({ initialTodos }: TodoAppProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [error, setError] = useState<string | null>(null);

  const summary = useMemo(() => {
    const completedCount = todos.filter((todo) => todo.completed).length;

    return {
      total: todos.length,
      completed: completedCount,
      remaining: todos.length - completedCount,
    };
  }, [todos]);

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

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
      setError(null);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete todo.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Todo List</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Stay on top of your day</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Add tasks, mark them complete, and clear finished work with a simple staging-ready app.
        </p>
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

      <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg backdrop-blur">
        <TodoForm onAddTodo={handleAddTodo} />
        {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
      </div>

      <TodoList todos={todos} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
    </div>
  );
}
