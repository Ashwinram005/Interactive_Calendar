import { AnimatePresence, motion } from 'framer-motion'
import { addMonths, format, isSameMonth, startOfToday, subMonths } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { useCalendar } from '../hooks/useCalendar'
import { useRangeSelection } from '../hooks/useRangeSelection'
import CalendarGrid from './CalendarGrid'
import Header from './Header'
import NotesPanel from './NotesPanel'

function getHeroByMonth(monthDate) {
  const month = Number(format(monthDate, 'M'))

  const images = [
    'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1457694587812-e8bf29a43845?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1493244040629-496f6d136cc3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1464822759844-d150ad6d1a5b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=1200&q=80',
  ]

  return images[month - 1]
}

function buildMonthKey(monthDate) {
  return `month:${format(monthDate, 'yyyy-MM')}`
}

function buildRangeKey(startDate, endDate) {
  return `range:${format(startDate, 'yyyy-MM-dd')}_${format(endDate, 'yyyy-MM-dd')}`
}

function Calendar() {
  const today = startOfToday()
  const [currentMonth, setCurrentMonth] = useState(today)
  const [storedNotes, setStoredNotes] = useState({})
  const [noteDraft, setNoteDraft] = useState('')
  const [theme, setTheme] = useState('light')

  const { monthLabel, weekDays, weeks } = useCalendar(currentMonth)
  const { startDate, endDate, onDateClick, onDateHover, getPreviewRange, resetRange } = useRangeSelection()
  const { previewStart, previewEnd } = getPreviewRange()

  const hasRange = Boolean(startDate && endDate)

  const noteKey = useMemo(() => {
    if (startDate && endDate) {
      return buildRangeKey(startDate, endDate)
    }

    return buildMonthKey(currentMonth)
  }, [startDate, endDate, currentMonth])

  const noteScopeLabel = useMemo(() => {
    if (startDate && endDate) {
      return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
    }

    return `Entire ${format(currentMonth, 'MMMM yyyy')}`
  }, [startDate, endDate, currentMonth])

  useEffect(() => {
    const savedRaw = localStorage.getItem('wall-calendar-notes-v1')
    if (!savedRaw) {
      return
    }

    try {
      const parsed = JSON.parse(savedRaw)
      if (parsed && typeof parsed === 'object') {
        setStoredNotes(parsed)
      }
    } catch {
      setStoredNotes({})
    }
  }, [])

  useEffect(() => {
    setNoteDraft(storedNotes[noteKey] || '')
  }, [storedNotes, noteKey])

  useEffect(() => {
    localStorage.setItem('wall-calendar-notes-v1', JSON.stringify(storedNotes))
  }, [storedNotes])

  const saveNotes = () => {
    setStoredNotes((prev) => ({
      ...prev,
      [noteKey]: noteDraft,
    }))
  }

  const goPreviousMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1))
  }

  const goNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1))
  }

  const jumpToToday = () => {
    setCurrentMonth(today)
  }

  const heroImage = getHeroByMonth(currentMonth)

  const isCurrentMonthVisible = isSameMonth(currentMonth, today)

  return (
    <main
      className={`min-h-screen bg-grain px-4 py-8 font-body sm:px-8 lg:h-screen lg:overflow-hidden lg:p-6 ${
        theme === 'dark' ? 'invert hue-rotate-180' : ''
      }`}
    >
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:h-full lg:grid-cols-[1.1fr,1fr]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/20 shadow-paper"
        >
          <img src={heroImage} alt={monthLabel} className="h-64 w-full object-cover sm:h-80 lg:h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-white/80">Wall Calendar</p>
            <h2 className="font-display text-4xl leading-none sm:text-5xl">{format(currentMonth, 'MMMM')}</h2>
            <p className="mt-2 max-w-md text-sm text-white/85">
              A tactile planning board with live range selection and month-aware notes.
            </p>
          </div>
        </motion.section>

        <section className="rounded-[2rem] bg-paper/95 p-5 shadow-paper backdrop-blur sm:p-6 lg:flex lg:h-full lg:flex-col lg:overflow-hidden lg:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-700 shadow transition hover:shadow-md"
            >
              {theme === 'light' ? 'Dark look' : 'Light look'}
            </button>

            <button
              type="button"
              onClick={jumpToToday}
              disabled={isCurrentMonthVisible}
              className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Jump to Today
            </button>
          </div>

          <Header
            monthLabel={monthLabel}
            onPreviousMonth={goPreviousMonth}
            onNextMonth={goNextMonth}
            onClearRange={resetRange}
            hasRange={hasRange}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={monthLabel}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="lg:flex-1"
            >
              <CalendarGrid
                weekDays={weekDays}
                weeks={weeks}
                startDate={startDate}
                endDate={endDate}
                previewStart={previewStart}
                previewEnd={previewEnd}
                today={today}
                onDateClick={onDateClick}
                onDateHover={onDateHover}
              />
            </motion.div>
          </AnimatePresence>

          <div className="mt-3 lg:mt-2">
            <NotesPanel
              noteScopeLabel={noteScopeLabel}
              notesText={noteDraft}
              onChange={setNoteDraft}
              onSave={saveNotes}
            />
          </div>
        </section>
      </div>
    </main>
  )
}

export default Calendar
