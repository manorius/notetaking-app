import prisma from "@/lib/prisma";
import AddNoteForm from "@/components/AddNoteForm";
import { Note } from "@/types";

async function getNotes(): Promise<Note[]> {
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return notes;
}

export default async function HomePage() {
  const notes = await getNotes();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">My Notes</h1>

      <AddNoteForm />

      <div className="space-y-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="p-4 bg-slate-700 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold">{note.title}</h2>
              {note.content && <p className="mt-2 text-slate-300">{note.content}</p>}
            </div>
          ))
        ) : (
          <p className="text-center text-slate-400">No notes yet. Create one!</p>
        )}
      </div>
    </div>
  );
}