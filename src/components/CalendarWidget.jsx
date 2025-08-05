import { useState } from "react"
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isSameDay
} from "date-fns"
import { es } from "date-fns/locale"
import EventList from "./EventList"

export default function CalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="text-gray-300 hover:text-white"
      >
        ←
      </button>
      <h2 className="text-white font-semibold text-lg">
        {format(currentMonth, "MMMM yyyy", { locale: es })}
      </h2>
      <button
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        className="text-gray-300 hover:text-white"
      >
        →
      </button>
    </div>
  )

  const renderDays = () => {
    const days = []
    const date = new Date()
    const weekStart = startOfWeek(date, { locale: es })

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-sm text-center text-gray-400 font-medium">
          {format(addDays(weekStart, i), "EEE", { locale: es })}
        </div>
      )
    }

    return <div className="grid grid-cols-7 gap-2 mb-2">{days}</div>
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart, { locale: es })
    const endDate = endOfWeek(monthEnd, { locale: es })

    const rows = []
    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day
        days.push(
          <div
            key={day}
            className={`text-sm p-2 text-center rounded-lg cursor-pointer transition
              ${
                !isSameMonth(day, monthStart)
                  ? "text-gray-500"
                  : isSameDay(day, selectedDate)
                  ? "bg-blue-600 text-white"
                  : "text-gray-100 hover:bg-gray-700"
              }`}
            onClick={() => setSelectedDate(cloneDay)}
          >
            {format(day, "d")}
          </div>
        )
        day = addDays(day, 1)
      }

      rows.push(
        <div key={day} className="grid grid-cols-7 gap-2 mb-1">
          {days}
        </div>
      )
      days = []
    }

    return <div>{rows}</div>
  }

  return (
    <div className="bg-[#1a1a1a] border border-gray-700 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-white mb-2">📆 Calendario</h3>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <EventList date={selectedDate} />
    </div>
  )
}
