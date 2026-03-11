/** @jest-environment node */

jest.mock("@/lib/db", () => ({

  prisma: {
    todo: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

import { GET, POST } from "@/app/api/todos/route";
import { prisma } from "@/lib/db";

const prismaMock = prisma as jest.Mocked<typeof prisma>;

describe("/api/todos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns todos", async () => {
    prismaMock.todo.findMany.mockResolvedValue([
      {
        id: 1,
        title: "Ship staging",
        completed: false,
        createdAt: new Date("2026-03-11T09:00:00.000Z"),
        updatedAt: new Date("2026-03-11T09:00:00.000Z"),
      },
    ]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(1);
  });

  it("creates a todo", async () => {
    prismaMock.todo.create.mockResolvedValue({
      id: 2,
      title: "Write docs",
      completed: false,
      createdAt: new Date("2026-03-11T09:00:00.000Z"),
      updatedAt: new Date("2026-03-11T09:00:00.000Z"),
    });

    const request = new Request("http://localhost/api/todos", {
      method: "POST",
      body: JSON.stringify({ title: "Write docs" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.title).toBe("Write docs");
  });

  it("rejects invalid payloads", async () => {
    const request = new Request("http://localhost/api/todos", {
      method: "POST",
      body: JSON.stringify({ title: "   " }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toMatch(/title is required/i);
  });
});
