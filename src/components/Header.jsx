import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from './icons'

function Header({ monthLabel, onPreviousMonth, onNextMonth, onClearRange, hasRange }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-3">
      <div>
        <h1 className="font-display text-4xl leading-none text-ink sm:text-5xl">{monthLabel}</h1>
        <p className="mt-2 text-sm text-zinc-600">Pick a date range or save notes for the month.</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPreviousMonth}
          className="rounded-full border border-zinc-300 bg-white/80 p-2 text-zinc-700 transition hover:scale-105 hover:bg-white"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onNextMonth}
          className="rounded-full border border-zinc-300 bg-white/80 p-2 text-zinc-700 transition hover:scale-105 hover:bg-white"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {hasRange ? (
        <motion.button
          layout
          type="button"
          onClick={onClearRange}
          className="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-zinc-700"
        >
          Clear Range
        </motion.button>
      ) : null}
    </div>
  )
}

export default Header
