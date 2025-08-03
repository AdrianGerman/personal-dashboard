import React, { useState, useEffect } from "react"

const getToday = () => new Date().toISOString().slice(0, 10)

export default function DailyHabits() {
  const [habits, setHabits] = useState([])
  const [newHabit, setNewHabit] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("daily-habits")
    if (stored) setHabits(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("daily-habits", JSON.stringify(habits))
  }, [habits])

  const addHabit = () => {
    const trimmed = newHabit.trim()
    if (!trimmed) return
    const newEntry = {
      id: Date.now(),
      text: trimmed,
      completed: []
    }
    setHabits([newEntry, ...habits])
    setNewHabit("")
  }

  const toggleComplete = (id) => {
    const today = getToday()
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed: habit.completed.includes(today)
                ? habit.completed.filter((d) => d !== today)
                : [...habit.completed, today]
            }
          : habit
      )
    )
  }

  const removeHabit = (id) => {
    setHabits(habits.filter((h) => h.id !== id))
  }

  const today = getToday()

  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-3">✅ Hábitos del día</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Agregar hábito o tarea..."
          className="flex-1 px-3 py-2 rounded bg-neutral-800 border border-neutral-700 text-sm text-white"
        />
        <button
          onClick={addHabit}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded"
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-2 text-sm text-neutral-300">
        {habits.length === 0 && (
          <p className="text-neutral-500 text-xs">Sin hábitos aún...</p>
        )}
        {habits.map((habit) => (
          <li
            key={habit.id}
            className="bg-neutral-800 px-3 py-2 rounded flex justify-between items-center"
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={habit.completed.includes(today)}
                onChange={() => toggleComplete(habit.id)}
                className="accent-green-500"
              />
              <span
                className={`${
                  habit.completed.includes(today)
                    ? "line-through text-green-400"
                    : ""
                }`}
              >
                {habit.text}
              </span>
            </label>
            <button
              onClick={() => removeHabit(habit.id)}
              className="text-red-400 hover:text-red-500 text-xs"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
