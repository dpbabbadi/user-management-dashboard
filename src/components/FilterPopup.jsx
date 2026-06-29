import { DEPARTMENTS } from "../utils/constants";

export default function FilterPopup({ open, value, onChange, onApply, onClose, onReset }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Filters</h3>
          <button className="btn ghost" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body grid-2">
          <label className="field">
            <span>First Name</span>
            <input
              className="input"
              value={value.firstName}
              onChange={(e) => onChange({ ...value, firstName: e.target.value })}
            />
          </label>

          <label className="field">
            <span>Last Name</span>
            <input
              className="input"
              value={value.lastName}
              onChange={(e) => onChange({ ...value, lastName: e.target.value })}
            />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              className="input"
              value={value.email}
              onChange={(e) => onChange({ ...value, email: e.target.value })}
            />
          </label>

          <label className="field">
            <span>Department</span>
            <select
              className="input"
              value={value.department}
              onChange={(e) => onChange({ ...value, department: e.target.value })}
            >
              <option value="">Any</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="modal-footer">
          <button className="btn" onClick={onReset}>Reset</button>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={onApply}>Apply</button>
        </div>
      </div>
    </div>
  );
}