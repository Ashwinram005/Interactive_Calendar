import { format, isSameDay, isWithinInterval } from 'date-fns'
import { motion } from 'framer-motion'

function DayCell({
  day,
  startDate,
  endDate,
  previewStart,
  previewEnd,
  today,
  onDateClick,
  onDateHover,
}) {
  const date = day.date
  const isToday = isSameDay(date, today)
  const isStart = startDate && isSameDay(date, startDate)
  const isEnd = endDate && isSameDay(date, endDate)

  const inSelectedRange =
    startDate &&
    endDate &&
    isWithinInterval(date, {
      start: startDate,
      end: endDate,
    })

  const inPreviewRange =
    previewStart &&
    previewEnd &&
    !endDate &&
    isWithinInterval(date, {
      start: previewStart,
      end: previewEnd,
    })

  const isRangeEdge = isStart || isEnd

  const rangeToneClass = inSelectedRange
    ? 'bg-accent/35 text-zinc-900 ring-1 ring-accent/35 sm:bg-accent/20 sm:ring-0'
    : inPreviewRange
      ? 'bg-accent/22 text-zinc-900 ring-1 ring-accent/20 sm:bg-accent/10 sm:ring-0'
      : ''

  return (
    <motion.button
      type="button"
      whileHover={{ scale: day.isCurrentMonth ? 1.04 : 1 }}
      whileTap={{ scale: 0.96 }}
      disabled={!day.isCurrentMonth}
      onMouseEnter={() => onDateHover(date)}
      onFocus={() => onDateHover(date)}
      onClick={() => onDateClick(date)}
      className={`relative h-12 rounded-2xl px-2 text-left transition active:ring-2 active:ring-accent active:ring-offset-1 active:ring-offset-paper focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-paper sm:active:ring-0 sm:focus-visible:ring-0 sm:h-14 lg:h-11 ${
        day.isCurrentMonth
          ? 'cursor-pointer bg-white/80 text-zinc-800 hover:bg-white'
          : 'cursor-not-allowed bg-zinc-100/80 text-zinc-400'
      } ${rangeToneClass} ${isRangeEdge ? 'bg-accent font-bold text-white ring-2 ring-white/75 hover:bg-accent sm:ring-0' : ''}`}
    >
      <span className="text-sm font-medium">{format(date, 'd')}</span>
      {isToday ? (
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-ink" aria-hidden="true" />
      ) : null}
    </motion.button>
  )
}

export default DayCell
