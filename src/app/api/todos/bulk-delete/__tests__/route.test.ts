/** @jest-environment node */

jest.mock("@/lib/db", () => ({
  prisma: {
    todo: {
      deleteMany: jest.fn(),
    },
  },
}));

import { POST } from "@/app/api/todos/bulk-delete/route";
import { prisma } from "@/lib/db";

const prismaMock = prisma as jest.Mocked<typeof prisma>;

describe("/api/todos/bulk-delete", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deletes multiple todos", async () => {
    prismaMock.todo.deleteMany.mockResolvedValue({ count: 2 });

    const request = new Request("http://localhost/api/todos/bulk-delete", {
      method: "POST",
      body: JSON.stringify({ ids: [1, 2] }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ ids: [1, 2] });
    expect(prismaMock.todo.deleteMany).toHaveBeenCalledWith({
      where: {
        id: {
          in: [1, 2],
        },
      },
    });
  });

  it("rejects empty selections", async () => {
    const request = new Request("http://localhost/api/todos/bulk-delete", {
      method: "POST",
      body: JSON.stringify({ ids: [] }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toMatch(/select at least one todo/i);
  });
});
