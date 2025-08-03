import { useEffect, useState } from "react"

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [unit, setUnit] = useState("c")

  const apiKey = import.meta.env.VITE_API_KEY

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=auto:ip&lang=es`
        )
        const data = await res.json()
        setWeather(data)
      } catch (err) {
        setError("No se pudo obtener el clima.", err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 text-sm text-zinc-400">
        Cargando clima...
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/30 border border-red-600 rounded-xl p-5 text-sm text-red-300">
        {error}
      </div>
    )
  }

  const {
    location: { name, country, localtime },
    current: {
      temp_c,
      temp_f,
      condition,
      wind_kph,
      wind_mph,
      humidity,
      feelslike_c,
      feelslike_f,
      is_day
    }
  } = weather

  const temp = unit === "c" ? temp_c : temp_f
  const feels = unit === "c" ? feelslike_c : feelslike_f
  const wind = unit === "c" ? `${wind_kph} km/h` : `${wind_mph} mph`

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 text-zinc-100 w-full max-w-md shadow">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">🌤️ Clima</h2>
        <button
          onClick={() => setUnit(unit === "c" ? "f" : "c")}
          className="bg-zinc-800 text-zinc-300 px-2 py-1 text-xs rounded hover:bg-zinc-700 transition cursor-pointer"
        >
          °{unit === "c" ? "F" : "C"}
        </button>
      </div>

      <p className="text-sm text-zinc-400 mb-1">
        {name}, {country} — <span>{localtime}</span>
      </p>

      <div className="flex items-center gap-4 mt-4">
        <img
          src={`https:${condition.icon}`}
          alt={condition.text}
          className="w-14 h-14"
        />
        <div>
          <p className="text-4xl font-bold">
            {temp}°{unit.toUpperCase()}
          </p>
          <p className="text-sm text-zinc-400">{condition.text}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-zinc-300">
        <p>💧 Humedad: {humidity}%</p>
        <p>🌬️ Viento: {wind}</p>
        <p>
          🌡️ Sensación: {feels}°{unit.toUpperCase()}
        </p>
        <p>{is_day ? "🌞 Día" : "🌙 Noche"}</p>
      </div>
    </div>
  )
}
