import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const libros = await prisma.libro.findMany();
    return NextResponse.json(libros);
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

export async function POST(request: Request) {
  try {
    const { title, Author, Category,Editorial,language } = await request.json();

    const newLibro = await prisma.libro.create({
      data: {
        title,
        Author,
        Category,
        Editorial,
        language,   
      },
    });

    return NextResponse.json(newLibro);
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
