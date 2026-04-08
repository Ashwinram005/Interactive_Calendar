import DayCell from './DayCell'

function CalendarGrid({
  weekDays,
  weeks,
  startDate,
  endDate,
  previewStart,
  previewEnd,
  today,
  onDateClick,
  onDateHover,
}) {
  return (
    <div>
      <div className="mb-3 grid grid-cols-7 gap-2">
        {weekDays.map((label) => (
          <div
            key={label}
            className="rounded-xl bg-zinc-900 px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-100"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weeks.flat().map((day) => (
          <DayCell
            key={day.date.toISOString()}
            day={day}
            startDate={startDate}
            endDate={endDate}
            previewStart={previewStart}
            previewEnd={previewEnd}
            today={today}
            onDateClick={onDateClick}
            onDateHover={onDateHover}
          />
        ))}
      </div>
    </div>
  )
}

export default CalendarGrid
