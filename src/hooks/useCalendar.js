import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns'

export function useCalendar(currentMonth) {
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })

  const days = []
  let day = gridStart

  while (day <= gridEnd) {
    days.push({
      date: day,
      isCurrentMonth: isSameMonth(day, currentMonth),
    })
    day = addDays(day, 1)
  }

  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return {
    monthLabel: format(currentMonth, 'MMMM yyyy'),
    weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weeks,
  }
}
