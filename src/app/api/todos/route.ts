import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateCreateTodo } from "@/lib/validation";

export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const data = validateCreateTodo(body);

    const todo = await prisma.todo.create({
      data,
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to create todo.",
      },
      { status: 400 },
    );
  }
}
