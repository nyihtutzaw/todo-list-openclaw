import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateBulkDeleteTodos } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const { ids } = validateBulkDeleteTodos(body);

    await prisma.todo.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json({ ids });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to delete selected todos.",
      },
      { status: 400 },
    );
  }
}
