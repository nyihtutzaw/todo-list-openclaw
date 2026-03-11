import { prisma } from "@/lib/db";
import { TodoApp } from "@/components/TodoApp";

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const initialTodos = todos.map((todo) => ({
    ...todo,
    createdAt: todo.createdAt.toISOString(),
    updatedAt: todo.updatedAt.toISOString(),
  }));

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-sky-100 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <TodoApp initialTodos={initialTodos} />
      </div>
    </main>
  );
}
