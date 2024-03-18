import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const libro = await prisma.libro.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!libro)
      return NextResponse.json({ message: "Note not found" }, { status: 404 });

    return NextResponse.json(libro);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedLibro = await prisma.libro.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedLibro)
      return NextResponse.json({ message: "libro not found" }, { status: 404 });

    return NextResponse.json(deletedLibro);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "libro not found",
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { title, Author, Category, Editorial, language} = await request.json();

    const updatedLibro = await prisma.libro.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title,
        Author,
        Category,
        Editorial,
        language,       
      },
    });

    return NextResponse.json(updatedLibro);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Libro not found",
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
