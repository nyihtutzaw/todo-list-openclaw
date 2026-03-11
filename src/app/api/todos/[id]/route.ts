import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateUpdateTodo } from "@/lib/validation";

function parseTodoId(value: string): number {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid todo id.");
  }

  return id;
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const todoId = parseTodoId(id);
    const body = (await request.json()) as unknown;
    const data = validateUpdateTodo(body);

    const todo = await prisma.todo.update({
      where: { id: todoId },
      data,
    });

    return NextResponse.json(todo);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update todo.";
    const status = message === "Invalid todo id." ? 400 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const todoId = parseTodoId(id);

    await prisma.todo.delete({
      where: { id: todoId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to delete todo.",
      },
      { status: 400 },
    );
  }
}
