import { useEffect, useState } from "react"

export default function QuoteWidget() {
  const [quote, setQuote] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            "https://zenquotes.io/api/today"
          )}`
        )
        const data = await res.json()
        const parsed = JSON.parse(data.contents)
        setQuote(parsed[0])
      } catch (err) {
        console.error("Error al obtener la frase:", err)
        setError(true)
      }
    }

    fetchQuote()
  }, [])

  return (
    <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 shadow-md w-full">
      <h2 className="text-xl font-semibold text-white mb-4">
        💬 Frase del Día
      </h2>

      {error ? (
        <p className="text-red-400 text-sm">No se pudo cargar la frase.</p>
      ) : !quote ? (
        <p className="text-gray-400 text-sm">Cargando...</p>
      ) : (
        <blockquote className="text-gray-300 italic border-l-4 border-blue-600 pl-4">
          “{quote.q}”
          <footer className="text-right text-sm mt-2 text-gray-400">
            – {quote.a}
          </footer>
        </blockquote>
      )}
    </div>
  )
}
