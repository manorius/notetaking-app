'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddNoteForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert('Title is required.');
      return;
    }

    try {
      await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      setTitle('');
      setContent('');
      router.refresh(); // Refresh the page to show the new note
    } catch (error) {
      console.error('Failed to create note:', error);
      alert('Failed to create note.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-slate-700 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold">Add a New Note</h2>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">
          Title
        </label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 rounded bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-1">
          Content (Optional)
        </label>
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={4} className="w-full p-2 rounded bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition-colors">
        Add Note
      </button>
    </form>
  );
}