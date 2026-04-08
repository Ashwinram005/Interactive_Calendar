function NotesPanel({ noteScopeLabel, notesText, onChange, onSave }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-paper sm:p-6">
      <h2 className="font-display text-3xl text-ink">Notes</h2>
      <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">{noteScopeLabel}</p>

      <textarea
        value={notesText}
        onChange={(event) => onChange(event.target.value)}
        className="mt-4 h-44 w-full resize-none rounded-2xl border border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-700 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
        placeholder="Add reminders, goals, and highlights for this period..."
      />

      <button
        type="button"
        onClick={onSave}
        className="mt-4 w-full rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
      >
        Save / Update Notes
      </button>
    </div>
  )
}

export default NotesPanel
