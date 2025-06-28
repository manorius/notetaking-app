import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/notes:
 *   get:
 *     description: Returns all notes
 *     responses:
 *       200:
 *         description: A list of notes
 */
export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    const newNote = await prisma.note.create({
      data: { title, content },
    });
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
  }
}