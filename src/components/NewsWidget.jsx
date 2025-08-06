import { useEffect, useState } from "react"

export default function NewsWidget() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml"
        )
        const data = await res.json()
        setArticles(data.items.slice(0, 5))
      } catch (error) {
        console.error("Error al obtener noticias:", error)
      }
    }

    fetchNews()
  }, [])

  return (
    <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 shadow-md w-full">
      <h2 className="text-xl font-semibold text-white mb-4">📰 Noticias</h2>

      {articles.length === 0 ? (
        <p className="text-gray-400 text-sm">Cargando noticias...</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((item) => (
            <li key={item.link}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:underline"
              >
                {item.title}
              </a>
              {item.description && (
                <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                  {item.description.replace(/<[^>]*>?/gm, "").slice(0, 100)}...
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
