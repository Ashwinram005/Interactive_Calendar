function NotesPanel({
  noteScopeLabel,
  notesList,
  relatedRangeNotes,
  noteInput,
  onInputChange,
  onAddNote,
  onRemoveNote,
  onSave,
}) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-paper sm:p-5 lg:rounded-[1.4rem] lg:p-3.5">
      <h2 className="font-display text-3xl text-ink">Notes</h2>
      <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">{noteScopeLabel}</p>

      <div className="mt-3 flex gap-2">
        <input
          value={noteInput}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              onAddNote()
            }
          }}
          className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
          placeholder="Add a note item..."
        />
        <button
          type="button"
          onClick={onAddNote}
          className="rounded-2xl bg-accent px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-90"
        >
          Add
        </button>
      </div>

      <ul className="mt-3 max-h-32 space-y-2 overflow-y-auto rounded-2xl border border-zinc-200 bg-zinc-50/60 p-3 sm:max-h-36 lg:max-h-28">
        {notesList.length > 0 ? (
          notesList.map((note, index) => (
            <li key={`${note}-${index}`} className="flex items-start justify-between gap-2">
              <span className="text-sm text-zinc-700">• {note}</span>
              <button
                type="button"
                onClick={() => onRemoveNote(index)}
                className="rounded-lg px-2 py-1 text-xs font-semibold text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-700"
                aria-label="Remove note"
              >
                Remove
              </button>
            </li>
          ))
        ) : (
          <li className="text-sm text-zinc-500">No notes added yet.</li>
        )}
      </ul>

      {relatedRangeNotes.length > 0 ? (
        <div className="mt-3 rounded-2xl border border-accent/30 bg-accent/10 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Matching Range Notes</p>
          <ul className="mt-2 space-y-1">
            {relatedRangeNotes.map((note, index) => (
              <li key={`${note}-${index}`} className="text-sm text-zinc-700">
                • {note}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <button
        type="button"
        onClick={onSave}
        className="mt-3 w-full rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
      >
        Save / Update Notes List
      </button>
    </div>
  )
}

export default NotesPanel
