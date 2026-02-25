const CHIPS = ['All', 'Music', 'Gaming', 'Education', 'Comedy', 'Travel', 'Sports', 'Live', 'Health', 'Cooking', 'Recently Uploaded', 'New to You'];

export default function FilterChips({ active, onChange }) {
  return (
    <div className="filter-chips" role="toolbar" aria-label="Filter chips">
      {CHIPS.map(chip => (
        <button
          key={chip}
          className={`chip${active === chip ? ' active' : ''}`}
          onClick={() => onChange(active === chip ? 'All' : chip)}
          aria-pressed={active === chip}
          aria-label={`Filter by ${chip}`}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
