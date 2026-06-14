"use client";

import { useEffect, useState } from "react";
import { getNotes } from "@/services/study";

export default function MyNotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const token =
        localStorage.getItem("token");

      if (!token) return;

      const data =
        await getNotes(token);

      setNotes(data);
    };

    fetchNotes();
  }, []);

  return (
    <main className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Notes
      </h1>

      <div className="space-y-4">

        {notes.map((note: any, index) => (
          

            <div
                key={index}
                className="border rounded-xl p-5"
                >
                <h2 className="font-semibold text-xl">
                    {note.topic}
                </h2>

                <p className="opacity-60 mt-2">
                    {new Date(note.created_at).toLocaleString()}
                </p>

                <div className="mt-4 whitespace-pre-wrap">
                    {note.notes}
                </div>
            </div>
          
        ))}

      </div>

    </main>
  );
}