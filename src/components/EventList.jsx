import { useState, useEffect } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Trash2 } from "lucide-react"

export default function EventList({ date }) {
  const [events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState("")

  const storageKey = `events-${format(date, "yyyy-MM-dd")}`

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || []
    setEvents(saved)
  }, [storageKey])

  const addEvent = () => {
    if (!newEvent.trim()) return
    const updated = [...events, newEvent.trim()]
    setEvents(updated)
    localStorage.setItem(storageKey, JSON.stringify(updated))
    setNewEvent("")
  }

  const removeEvent = (index) => {
    const updated = events.filter((_, i) => i !== index)
    setEvents(updated)
    localStorage.setItem(storageKey, JSON.stringify(updated))
  }

  return (
    <div className="mt-6">
      <h4 className="text-sm text-gray-400 mb-2">
        Eventos para{" "}
        <span className="text-white font-medium">
          {format(date, "PPP", { locale: es })}
        </span>
      </h4>

      {events.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay eventos aún.</p>
      ) : (
        <ul className="space-y-2 mb-4">
          {events.map((event, index) => (
            <li
              key={index}
              className="bg-[#2a2a2a] border border-gray-700 px-3 py-2 rounded-lg flex justify-between items-center text-sm text-white"
            >
              {event}
              <button
                onClick={() => removeEvent(index)}
                className="text-red-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-2">
        <input
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addEvent()}
          className="bg-[#1a1a1a] border border-gray-600 px-3 py-2 rounded-lg text-sm text-white flex-1"
          placeholder="Agregar evento..."
        />
        <button
          onClick={addEvent}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg"
        >
          Agregar
        </button>
      </div>
    </div>
  )
}
