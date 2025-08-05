import QuickNotes from "./components/QuickNotes"
import DailyHabits from "./components/DailyHabits"
import WeatherWidget from "./components/WeatherWidget"
import CalendarWidget from "./components/CalendarWidget"

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      <header className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
        <h1 className="text-2xl font-bold">📊 Dashboard Personal</h1>
        <button className="bg-neutral-800 text-sm px-3 py-1 rounded hover:bg-neutral-700 transition">
          🌙 Modo oscuro
        </button>
      </header>

      <main className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <QuickNotes />
        <DailyHabits />
        <WeatherWidget />
        <CalendarWidget />
      </main>
    </div>
  )
}
