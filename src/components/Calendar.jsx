import { AnimatePresence, motion } from 'framer-motion'
import { addMonths, format, isSameMonth, startOfToday, subMonths } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { useCalendar } from '../hooks/useCalendar'
import { useRangeSelection } from '../hooks/useRangeSelection'
import CalendarGrid from './CalendarGrid'
import Header from './Header'
import NotesPanel from './NotesPanel'

function getHeroCandidatesByMonth(monthDate) {
  const month = Number(format(monthDate, 'M'))

  const prompts = [
    'winter,snow,mountain',
    'cozy,winter,landscape',
    'spring,flowers,meadow',
    'spring,rain,city',
    'sunrise,green,field',
    'summer,beach,ocean',
    'summer,lake,mountain',
    'sunset,forest,nature',
    'autumn,leaves,park',
    'autumn,mist,landscape',
    'november,forest,path',
    'december,holiday,lights',
  ]

  const prompt = prompts[month - 1]

  return [
    `https://source.unsplash.com/1600x1000/?${prompt}`,
    `https://source.unsplash.com/1600x1000/?calendar,wall,${prompt}`,
    `https://picsum.photos/seed/wall-calendar-${month}/1600/1000`,
  ]
}

function buildMonthKey(monthDate) {
  return `month:${format(monthDate, 'yyyy-MM')}`
}

function buildRangeKey(startDate, endDate) {
  return `range:${format(startDate, 'yyyy-MM-dd')}_${format(endDate, 'yyyy-MM-dd')}`
}

function buildDateKey(date) {
  return `date:${format(date, 'yyyy-MM-dd')}`
}

function Calendar() {
  const today = startOfToday()
  const [currentMonth, setCurrentMonth] = useState(today)
  const [storedNotes, setStoredNotes] = useState({})
  const [noteDraft, setNoteDraft] = useState('')
  const [theme, setTheme] = useState('light')
  const [heroIndex, setHeroIndex] = useState(0)

  const { monthLabel, weekDays, weeks } = useCalendar(currentMonth)
  const { startDate, endDate, onDateClick, onDateHover, getPreviewRange, resetRange } = useRangeSelection()
  const { previewStart, previewEnd } = getPreviewRange()

  const hasRange = Boolean(startDate && endDate)

  const noteKey = useMemo(() => {
    if (startDate && endDate) {
      return buildRangeKey(startDate, endDate)
    }

    if (startDate && !endDate) {
      return buildDateKey(startDate)
    }

    return buildMonthKey(currentMonth)
  }, [startDate, endDate, currentMonth])

  const noteScopeLabel = useMemo(() => {
    if (startDate && endDate) {
      return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
    }

    if (startDate && !endDate) {
      return `Date: ${format(startDate, 'MMM d, yyyy')}`
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

  const heroCandidates = useMemo(() => getHeroCandidatesByMonth(currentMonth), [currentMonth])
  const heroImage = heroCandidates[Math.min(heroIndex, heroCandidates.length - 1)]

  useEffect(() => {
    setHeroIndex(0)
  }, [currentMonth])

  const isCurrentMonthVisible = isSameMonth(currentMonth, today)

  return (
    <main
      className="min-h-screen bg-grain px-4 py-8 font-body sm:px-8 lg:h-screen lg:overflow-hidden lg:p-6"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:h-full lg:grid-cols-[1.1fr,1fr]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/20 shadow-paper"
        >
          <img
            src={heroImage}
            alt={monthLabel}
            className="h-64 w-full object-cover sm:h-80 lg:h-full"
            onError={() => {
              setHeroIndex((prev) => Math.min(prev + 1, heroCandidates.length - 1))
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-white/80">Wall Calendar</p>
            <h2 className="font-display text-4xl leading-none sm:text-5xl">{format(currentMonth, 'MMMM')}</h2>
            <p className="mt-2 max-w-md text-sm text-white/85">
              A tactile planning board with live range selection and month-aware notes.
            </p>
          </div>
        </motion.section>

        <section
          className={`rounded-[2rem] bg-paper/95 p-5 shadow-paper backdrop-blur sm:p-6 lg:flex lg:h-full lg:flex-col lg:overflow-hidden lg:p-5 ${
            theme === 'dark' ? 'invert hue-rotate-180' : ''
          }`}
        >
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

          <div className="calendar-progress-scroll lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={monthLabel}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
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
          </div>
        </section>
      </div>
    </main>
  )
}

export default Calendar
