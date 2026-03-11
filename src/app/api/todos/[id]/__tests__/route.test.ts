/** @jest-environment node */

jest.mock("@/lib/db", () => ({

  prisma: {
    todo: {
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

import { DELETE, PATCH } from "@/app/api/todos/[id]/route";
import { prisma } from "@/lib/db";

const prismaMock = prisma as jest.Mocked<typeof prisma>;

describe("/api/todos/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("updates a todo", async () => {
    prismaMock.todo.update.mockResolvedValue({
      id: 1,
      title: "Updated todo",
      completed: true,
      createdAt: new Date("2026-03-11T09:00:00.000Z"),
      updatedAt: new Date("2026-03-11T09:05:00.000Z"),
    });

    const request = new Request("http://localhost/api/todos/1", {
      method: "PATCH",
      body: JSON.stringify({ completed: true }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await PATCH(request, { params: Promise.resolve({ id: "1" }) });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.completed).toBe(true);
  });

  it("rejects invalid ids", async () => {
    const request = new Request("http://localhost/api/todos/not-a-number", {
      method: "PATCH",
      body: JSON.stringify({ completed: true }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await PATCH(request, { params: Promise.resolve({ id: "abc" }) });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toMatch(/invalid todo id/i);
  });

  it("deletes a todo", async () => {
    prismaMock.todo.delete.mockResolvedValue({
      id: 1,
      title: "Delete me",
      completed: false,
      createdAt: new Date("2026-03-11T09:00:00.000Z"),
      updatedAt: new Date("2026-03-11T09:00:00.000Z"),
    });

    const response = await DELETE(new Request("http://localhost/api/todos/1"), {
      params: Promise.resolve({ id: "1" }),
    });

    expect(response.status).toBe(204);
  });
});
