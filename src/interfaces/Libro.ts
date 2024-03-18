import { Libro } from "@prisma/client";

export type CreateLibro = Omit<Libro, "id" | "createdAt" | "updatedAt">;

export type UpdateLibro = Partial<CreateLibro>;