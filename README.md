# Interactive Wall Calendar

A premium, responsive wall-calendar style app built with React + Vite + Tailwind CSS.

## Why This Stack

- React (functional components + hooks): clean stateful UI architecture for date interactions.
- Vite: fast local development and simple production builds.
- Tailwind CSS: rapid, consistent styling for responsive layouts.
- date-fns: reliable month/day calculations (leap years, weekday alignment, range math).
- Framer Motion: smooth transitions for month changes and subtle UI feedback.
- localStorage: persistent client-side notes without backend setup.

## Key Product Choices

- Physical wall-calendar inspired layout:
  - Desktop: hero image on one side, calendar + notes on the other.
  - Mobile: stacked layout for readability and touch interactions.
- Date behavior:
  - Single-date selection by default.
  - Range selection only when `Range` mode is enabled.
  - Start/end + in-range/preview highlight states.
- Notes model:
  - Supports month-level, single-date, and range-level notes.
  - Notes are list-based (add/remove items) and persisted in localStorage.
  - When selecting a date, matching range notes that include that date are also surfaced.
- UX refinements:
  - Mobile-safe toast notifications for save/update/clear actions.
  - Progress-style scrollbar in the calendar notes region.
  - Dark look toggle scoped to calendar panel (hero image remains natural).

## Project Structure

- `src/components/Calendar.jsx` - Main container, date modes, notes persistence, toast.
- `src/components/CalendarGrid.jsx` - Grid + weekday header rendering.
- `src/components/DayCell.jsx` - Individual date cell interactions and visual states.
- `src/components/NotesPanel.jsx` - Notes list UI and related range notes display.
- `src/components/Header.jsx` - Month navigation controls.
- `src/hooks/useCalendar.js` - Month matrix generation logic.
- `src/hooks/useRangeSelection.js` - Selection mode and range behavior.

## Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Notes Persistence

Notes are saved under this browser key:

- `wall-calendar-notes-v1`

Data is scoped by keys like:

- `month:YYYY-MM`
- `date:YYYY-MM-DD`
- `range:YYYY-MM-DD_YYYY-MM-DD`
