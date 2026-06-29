export default function SearchBar({ value, onChange, onOpenFilters, onClear }) {
  return (
    <div className="toolbar">
      <input
        className="input"
        placeholder="Search by first name, last name, or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="toolbar-actions">
        <button className="btn" onClick={onOpenFilters}>Filters</button>
        <button className="btn ghost" onClick={onClear}>Clear</button>
      </div>
    </div>
  );
}