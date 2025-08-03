import React, { useState, useEffect } from "react"

export default function QuickNotes() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")

  // Cargar desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("quick-notes")
    if (stored) setNotes(JSON.parse(stored))
  }, [])

  // Guardar cada cambio
  useEffect(() => {
    localStorage.setItem("quick-notes", JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if (newNote.trim() === "") return
    setNotes([{ id: Date.now(), text: newNote }, ...notes])
    setNewNote("")
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  return (
    <section className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 shadow-md">
      <h2 className="text-lg font-semibold mb-3">🧠 Notas rápidas</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Escribe algo rápido..."
          className="flex-1 px-3 py-2 rounded bg-neutral-800 border border-neutral-700 text-sm text-white"
        />
        <button
          onClick={addNote}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-2 text-sm text-neutral-300">
        {notes.map((note) => (
          <li
            key={note.id}
            className="bg-neutral-800 px-3 py-2 rounded flex justify-between items-center"
          >
            <span>{note.text}</span>
            <button
              onClick={() => deleteNote(note.id)}
              className="text-red-400 hover:text-red-500 text-xs"
            >
              ✖
            </button>
          </li>
        ))}
        {notes.length === 0 && (
          <p className="text-neutral-500 text-xs">Sin notas por ahora...</p>
        )}
      </ul>
    </section>
  )
}
